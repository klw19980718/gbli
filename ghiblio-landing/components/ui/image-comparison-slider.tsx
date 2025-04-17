"use client"

import { useState, useEffect, useRef } from "react"

interface ImageComparisonSliderProps {
  beforeImage: string
  afterImage: string
  beforeLabel?: string
  afterLabel?: string
  width?: number
  height?: number
}

export function ImageComparisonSlider({
  beforeImage,
  afterImage,
  beforeLabel = "原图",
  afterLabel = "AI 生成",
  width = 600,
  height = 400,
}: ImageComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleTouchStart = () => {
    setIsDragging(true)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
    if (isDragging && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const containerWidth = rect.width
      
      // 计算滑块位置百分比，并限制在0-100之间
      const position = Math.max(0, Math.min(100, (x / containerWidth) * 100))
      setSliderPosition(position)
    }
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement> | TouchEvent) => {
    if (isDragging && containerRef.current && e.touches && e.touches[0]) {
      const rect = containerRef.current.getBoundingClientRect()
      const x = e.touches[0].clientX - rect.left
      const containerWidth = rect.width
      
      // 计算滑块位置百分比，并限制在0-100之间
      const position = Math.max(0, Math.min(100, (x / containerWidth) * 100))
      setSliderPosition(position)
    }
  }

  // 添加全局鼠标和触摸事件监听器
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false)
    }

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMouseMove(e)
      }
    }

    const handleGlobalTouchEnd = () => {
      setIsDragging(false)
    }

    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        handleTouchMove(e)
      }
    }

    // 添加事件监听器
    window.addEventListener('mouseup', handleGlobalMouseUp)
    window.addEventListener('mousemove', handleGlobalMouseMove)
    window.addEventListener('touchend', handleGlobalTouchEnd)
    window.addEventListener('touchmove', handleGlobalTouchMove, { passive: false })

    // 清理函数
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp)
      window.removeEventListener('mousemove', handleGlobalMouseMove)
      window.removeEventListener('touchend', handleGlobalTouchEnd)
      window.removeEventListener('touchmove', handleGlobalTouchMove)
    }
  }, [isDragging])

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full select-none cursor-col-resize overflow-hidden"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
    >
      {/* 底层图像（After Image）*/}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={afterImage}
          alt="After transformation"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-[#FFD300] text-[#0F0F0F] text-xs px-2 py-1 rounded">
          {afterLabel}
        </div>
      </div>

      {/* 上层图像（Before Image）使用裁剪遮罩显示 */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <div 
          className="relative h-full"
          style={{ width: sliderPosition > 0 ? `${100 / (sliderPosition / 100)}%` : '100%' }}
        >
          <img
            src={beforeImage}
            alt="Before transformation"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-4 left-4 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {beforeLabel}
        </div>
      </div>

      {/* 滑块 */}
      <div 
        className="absolute top-0 bottom-0 w-0.5 bg-white cursor-col-resize z-10"
        style={{ left: `${sliderPosition}%` }}
      >
        <div 
          className="absolute w-8 h-8 bg-white rounded-full shadow-md -ml-4 top-1/2 -mt-4 flex items-center justify-center"
          style={{ touchAction: 'none' }}
        >
          <div className="flex space-x-0.5">
            <div className="w-1 h-4 bg-gray-400 rounded-full"></div>
            <div className="w-1 h-4 bg-gray-400 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
} 