'use client'

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'

const useMeasure = () => {
  const ref = useRef(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useLayoutEffect(() => {
    if (!ref.current) return
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize({ width, height })
    })
    ro.observe(ref.current)
    return () => ro.disconnect()
  }, [])

  return [ref, size]
}

const Masonry = () => {
  const items = [
    { id: '1', img: '/images/6.jpg', url: '#', height: 500 },
    { id: '2', img: '/images/7.jpg', url: '#', height: 450 },
    { id: '4', img: '/images/11.png', url: '#', height: 500 },
    { id: '5', img: '/images/13.png', url: '#', height: 300 },
    { id: '6', img: '/images/R6.png', url: '#', height: 600 },
    { id: '7', img: '/images/R7.png', url: '#', height: 400 },
    { id: '8', img: '/images/R8.png', url: '#', height: 350 },
  ]

  const [containerRef, { width }] = useMeasure()
  const [imagesReady, setImagesReady] = useState(false)
  const containerHeight = useRef(0)

  useEffect(() => {
    const preload = async () => {
      await Promise.all(
        items.map(
          (item) =>
            new Promise((res) => {
              const img = new Image()
              img.src = item.img
              img.onload = img.onerror = () => res()
            })
        )
      )
      setImagesReady(true)
    }
    preload()
  }, [items])

  const columns = useMemo(() => {
    if (width >= 1500) return 3
    if (width >= 1000) return 3
    if (width >= 600) return 2
    return 1
  }, [width])

  const grid = useMemo(() => {
    if (!width) return []
    const gap = 24
    const colHeights = Array(columns).fill(0)
    const columnWidth = (width - (columns - 1) * gap) / columns

    const layout = items.map((item) => {
      const col = colHeights.indexOf(Math.min(...colHeights))
      const x = col * (columnWidth + gap)
      const y = colHeights[col]
      colHeights[col] += item.height + gap
      return { ...item, x, y, w: columnWidth, h: item.height }
    })

    containerHeight.current = Math.max(...colHeights) - gap
    return layout
  }, [columns, items, width])

  useLayoutEffect(() => {
    if (!imagesReady) return
    grid.forEach((item, i) => {
      gsap.fromTo(
        `[data-key="${item.id}"]`,
        {
          opacity: 0,
          y: item.y + 100,
          x: item.x,
          width: item.w,
          height: item.h,
          filter: 'blur(10px)',
        },
        {
          opacity: 1,
          y: item.y,
          x: item.x,
          width: item.w,
          height: item.h,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power3.out',
          delay: i * 0.05,
        }
      )
    })
  }, [grid, imagesReady])

  return (
    <div
      ref={containerRef}
      className="relative w-full px-4 md:px-20 pb-24"
      style={{ height: containerHeight.current }}
    >
      {grid.map((item) => (
        <div
          key={item.id}
          data-key={item.id}
          className="absolute box-content cursor-pointer"
          style={{ willChange: 'transform, width, height, opacity' }}
          onClick={() => window.open(item.url, '_blank', 'noopener')}
        >
          <div
            className="w-full h-full bg-cover bg-center rounded-[10px] shadow-md"
            style={{ backgroundImage: `url(${item.img})` }}
          />
        </div>
      ))}
    </div>
  )
}

export default Masonry
