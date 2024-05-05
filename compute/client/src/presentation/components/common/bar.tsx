"use client"

import { useCallback, useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { useToast } from "../ui/use-toast"

const data = [
  {
    name: "Ene",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Abr",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Ago",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Sep",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Oct",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Nov",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Dic",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
]

export function Overview() {
  const [sseConnection, setSSEConnection] = useState<EventSource | null>(null)
  const { toast } = useToast()

  const listenToSSEUpdates = useCallback(() => {
    console.log('listenToSSEUpdates func')
    const eventSource = new EventSource('/api/sse')

    eventSource.onopen = () => {
      console.log('SSE connection opened.')
      // Save the SSE connection reference in the state
    }

    eventSource.addEventListener("measurement", (e) => {
      const data = JSON.parse(e.data)?.fullDocument
      toast({
        title: "New Measurement",
        description: `Register with id: ${data._id} and value ${data.message}`,
      })
    });

    eventSource.addEventListener("alert", (e) => {
      const data = JSON.parse(e.data)?.fullDocument
      toast({
        title: "New Alert",
        description: `Register with id: ${data._id} and type ${data.type}`,
      })
    });

    eventSource.onerror = (event) => {
      console.error('SSE Error:', event)
      // Handle the SSE error here
    }
    setSSEConnection(eventSource)

    return eventSource
  }, [])

  useEffect(() => {
    listenToSSEUpdates()

    return () => {
      if (sseConnection) {
        sseConnection.close()
      }
    }
  }, [listenToSSEUpdates])
  
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}