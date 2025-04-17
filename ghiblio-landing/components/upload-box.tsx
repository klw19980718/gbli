"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, ImageIcon, X } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover"

interface UploadBoxProps {
  type: "text" | "image" | "batch"
}

// 定义选项类型，方便复用
type Option = { id: string; name: string; icon: string; hot?: boolean }

// 将选项数据移到组件外部或常量文件中更佳，此处为简化
const styleOptions: Option[] = [
  { id: "none", name: "无风格", icon: "🎨" },
  { id: "ghibli", name: "吉卜力", icon: "🏯", hot: true },
  { id: "pixar", name: "皮克斯", icon: "🚀" },
  { id: "shinkai", name: "新海诚", icon: "☁️" },
  { id: "disney", name: "迪士尼", icon: "🏰" },
  { id: "realistic", name: "写实风格", icon: "📷" },
  { id: "anime", name: "二次元风格", icon: "👧" },
  { id: "sticker", name: "Q版表情贴纸", icon: "😊", hot: true },
  { id: "chibi", name: "日本小人风格", icon: "👶", hot: true },
]
const ratioOptions: Option[] = [
  { id: "square", name: "正方形", icon: "⬛" },
  { id: "landscape", name: "横版", icon: "🖼️" },
  { id: "portrait", name: "竖版", icon: "📱" },
]
const colorOptions: Option[] = [
  { id: "none", name: "无色彩", icon: "⚪" },
  { id: "warm", name: "暖色调", icon: "🔶" },
  { id: "cold", name: "冷色调", icon: "🔷" },
  { id: "soft", name: "柔和色调", icon: "🔘" },
  { id: "vibrant", name: "鲜艳色调", icon: "🌈" },
  { id: "pastel", name: "粉彩色调", icon: "🧁" },
  { id: "bw", name: "黑白", icon: "⚫" },
]
const compositionOptions: Option[] = [
  { id: "none", name: "无构图", icon: "⬜" },
  { id: "blur", name: "背景虚化", icon: "🔍" },
  { id: "closeup", name: "特写", icon: "👁️" },
  { id: "wide", name: "广角", icon: "📸" },
  { id: "depth", name: "景深", icon: "🌫️" },
  { id: "low", name: "低角度", icon: "↗️" },
  { id: "high", name: "高角度", icon: "↘️" },
  { id: "macro", name: "微距", icon: "🔎" },
]

// 查找初始选项的辅助函数
const findInitialOption = (options: Option[], initialName: string): Option => {
  return options.find(opt => opt.name === initialName) || options[0];
};

export function UploadBox({ type }: UploadBoxProps) {
  const [text, setText] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // 风格选择状态
  const [style, setStyle] = useState<Option>(findInitialOption(styleOptions, "吉卜力"))
  const [ratio, setRatio] = useState<Option>(findInitialOption(ratioOptions, "正方形"))
  const [color, setColor] = useState<Option>(findInitialOption(colorOptions, "冷色调"))
  const [composition, setComposition] = useState<Option>(findInitialOption(compositionOptions, "低角度"))
  
  // 移除旧的下拉选择器状态
  // const [activeSelector, setActiveSelector] = useState<"style" | "ratio" | "color" | "composition" | null>(null)
  // const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null)
  
  // 移除旧的按钮引用
  // const styleButtonRef = useRef<HTMLButtonElement>(null)
  // ... (其他按钮 ref)

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...selectedFiles])
      const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file))
      setPreviews((prev) => [...prev, ...newPreviews])
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files) {
      const droppedFiles = Array.from(e.dataTransfer.files)
      setFiles((prev) => [...prev, ...droppedFiles])
      const newPreviews = droppedFiles.map((file) => URL.createObjectURL(file))
      setPreviews((prev) => [...prev, ...newPreviews])
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const removeFile = (index: number) => {
    URL.revokeObjectURL(previews[index])
    setFiles(files.filter((_, i) => i !== index))
    setPreviews(previews.filter((_, i) => i !== index))
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }
  
  // 移除 handleOpenSelector
  // const handleOpenSelector = ...
  
  // 移除旧的 handleSelect
  // const handleSelect = ...

  // 辅助函数：渲染选项列表
  const renderOptionsList = (options: Option[], onSelect: (option: Option) => void) => (
    <div className="py-1">
      {options.map((option) => (
        <div
          key={option.id}
          className="relative px-2 py-1 hover:bg-[#252525] cursor-pointer flex items-center gap-1.5 transition-colors"
          onClick={() => onSelect(option)}
        >
          <span className="text-base">{option.icon}</span>
          <span className="text-xs text-white">{option.name}</span>
          {option.hot && (
            <span className="absolute right-1.5 bg-[#FF3B30] text-white text-[9px] px-0.5 py-0.5 rounded-full">
              热门
            </span>
          )}
        </div>
      ))}
    </div>
  );

  const renderStyleButtons = () => (
    <div className="flex flex-nowrap gap-1 mt-2">
      {/* 风格 Popover */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="bg-[#252525] border-none text-[rgba(255,255,255,0.6)] hover:bg-[#333] hover:text-white text-xs py-1 px-2.5"
          >
            <span className="mr-1">{style.icon}</span> {style.name}
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-auto p-0 bg-[#0F0F0F] border border-[rgba(255,255,255,0.1)] shadow-lg"
          sideOffset={5}
        >
          {renderOptionsList(styleOptions, setStyle)}
        </PopoverContent>
      </Popover>

      {/* 比例 Popover */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="bg-[#252525] border-none text-[rgba(255,255,255,0.6)] hover:bg-[#333] hover:text-white text-xs py-1 px-2.5"
          >
            <span className="mr-1">{ratio.icon}</span> {ratio.name}
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-auto p-0 bg-[#0F0F0F] border border-[rgba(255,255,255,0.1)] shadow-lg"
          sideOffset={5}
        >
          {renderOptionsList(ratioOptions, setRatio)}
        </PopoverContent>
      </Popover>

      {/* 颜色 Popover */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="bg-[#252525] border-none text-[rgba(255,255,255,0.6)] hover:bg-[#333] hover:text-white text-xs py-1 px-2.5"
          >
            <span className="mr-1">{color.icon}</span> {color.name}
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-auto p-0 bg-[#0F0F0F] border border-[rgba(255,255,255,0.1)] shadow-lg"
          sideOffset={5}
        >
          {renderOptionsList(colorOptions, setColor)}
        </PopoverContent>
      </Popover>

      {/* 构图 Popover */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="bg-[#252525] border-none text-[rgba(255,255,255,0.6)] hover:bg-[#333] hover:text-white text-xs py-1 px-2.5"
          >
            <span className="mr-1">{composition.icon}</span> {composition.name}
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-auto p-0 bg-[#0F0F0F] border border-[rgba(255,255,255,0.1)] shadow-lg"
          sideOffset={5}
        >
          {renderOptionsList(compositionOptions, setComposition)}
        </PopoverContent>
      </Popover>
    </div>
  )

  // --- 定义统一高度 ---
  const consistentHeightClass = "h-[210px]"; // 稍微增加一点高度以容纳padding和gap
  const consistentMinHeightClass = "min-h-[210px]"; // 使用 min-height 以适应内容

  if (type === "text") {
    return (
      <div className="w-full mx-auto">
        <Textarea
          placeholder="描述你想要的画面..."
          className={`text-sm bg-[#1A1A1A] border-[rgba(255,255,255,0.1)] text-white placeholder:text-[rgba(255,255,255,0.4)] resize-none rounded-lg ${consistentMinHeightClass}`} // 使用 min-height
          value={text}
          onChange={handleTextChange}
        />
        <div className="mt-3">
           {renderStyleButtons()}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full mx-auto">
      {/* 移除父级 grid 的固定高度，让子元素决定高度 */} 
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 mb-4`}> 
        {/* 左侧：图片上传区域 */} 
        <div
          // 移除固定高度，添加 overflow-y-auto 和 min-height 
          className={`border border-[rgba(255,255,255,0.1)] rounded-lg p-2 text-center bg-[#1A1A1A] flex flex-col ${previews.length > 0 ? 'justify-start' : 'justify-center'} items-center overflow-hidden overflow-y-auto ${consistentMinHeightClass}`} 
          onClick={!previews.length ? triggerFileInput : undefined}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          style={{ scrollbarWidth: 'thin' }} // 细化滚动条 (可选)
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
            multiple={type === "batch"}
            accept="image/*"
          />

          {/* 图片预览或上传提示 */}  
          {previews.length > 0 ? (
            <div className={`w-full h-auto flex ${type === 'image' ? 'justify-center items-center p-2' : 'items-start'}`}> {/* image 模式加 padding */} 
              {/* 单图居中显示 ('image' mode) */} 
              {type === 'image' && previews[0] && (
                <div className="relative max-w-full max-h-full group"> 
                  <Image
                    src={previews[0]}
                    alt="Preview 0"
                    width={150} 
                    height={150} 
                    className="object-contain rounded-md"
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                  />
                   <button
                      className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                      onClick={(e) => { e.stopPropagation(); removeFile(0); }}
                    >
                      <X size={12} /> 
                    </button>
                </div>
              )}

              {/* 多图网格显示 ('batch' mode) */} 
              {type === 'batch' && (
                // 保持 grid-cols-3，图片会小，可以滚动 
                <div className={`grid grid-cols-3 gap-1 w-full`}> 
                  {previews.map((preview, index) => (
                    <div key={index} className="relative group aspect-square"> 
                      <Image
                        src={preview || "/placeholder.svg"}
                        alt={`Preview ${index}`}
                        fill
                        className="object-cover rounded-sm"
                      />
                      <button
                        className="absolute top-0.5 right-0.5 bg-black/70 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        onClick={(e) => { e.stopPropagation(); removeFile(index); }}
                      >
                        <X size={10} /> 
                      </button>
                    </div>
                  ))}
                  {/* "添加更多" 按钮 */} 
                  {files.length < 5 && ( 
                    <div 
                      className="flex items-center justify-center aspect-square border border-dashed border-[rgba(255,255,255,0.2)] rounded-sm bg-[#252525]/50 cursor-pointer hover:bg-[#333]/50 transition-colors" 
                      onClick={triggerFileInput}
                      title="添加图片"
                    > 
                      <div className="flex flex-col items-center text-[rgba(255,255,255,0.6)] scale-90"> 
                        <Upload size={18} />
                        <span className="mt-0.5 text-[10px]">添加</span> 
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
             // 上传提示 (保持居中)
            <div 
              className="flex flex-col items-center justify-center h-full cursor-pointer" 
              onClick={triggerFileInput}
            >
              <div className="bg-[#252525] p-2.5 rounded-full mb-3">
                 {type === "image" ? (<ImageIcon size={20} className="text-[#FFD300]" />) : (<Upload size={20} className="text-[#FFD300]" />) } 
              </div>
              <p className="text-sm font-medium mb-1 text-white">{type === "image" ? "上传图片" : "上传多张图片"}</p>
              <p className="text-xs text-[rgba(255,255,255,0.6)]">{type === "image" ? "支持 JPG, PNG" : "最多可上传 5 张"}</p>
            </div>
          )}
        </div>

        {/* 右侧：文本输入区域 */} 
        <div>
          <Textarea
            placeholder="添加图像描述（可选），描述越详细，效果越好"
            className={`text-sm bg-[#1A1A1A] border-[rgba(255,255,255,0.1)] text-white placeholder:text-[rgba(255,255,255,0.4)] resize-none rounded-lg ${consistentMinHeightClass}`} // 使用 min-height
            value={text}
            onChange={handleTextChange}
          />
        </div>
      </div>

      {/* 风格选择按钮 */} 
      <div className="mt-3">
        {renderStyleButtons()}
      </div>
    </div>
  )
}
