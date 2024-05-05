import { NextApiRequest, NextApiResponse } from 'next'
import { MeasurementchangeStream, AlertchangeStream } from '@/infrastructure/database/mongo-client.database'

const HEARTBEAT_INTERVAL = 5000 // 5 seconds (adjust this as needed)

export default function GET(req: NextApiRequest, res: NextApiResponse) {
  // Check if the client accepts SSE

  if (req.headers.accept && req.headers.accept === 'text/event-stream') {
    // Set SSE headers
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')
    res.setHeader('Content-Encoding', 'none')

    const intervalId = setInterval(() => {
      // Send a heartbeat message to keep the connection alive
      res.write(': heartbeat\n\n')
    }, HEARTBEAT_INTERVAL)

    // Send real-time updates to the client
    const sendUpdate = (data: { [key: string]: string }, eventName: string) => {
      const event = `data: ${JSON.stringify(data)}\n\n`
      console.log('Sending event:', event)
      res.write(`event: ${eventName}\n${event}`)
    }

    MeasurementchangeStream.on('change', (change) => {
      // Notify the client about the change
      sendUpdate(change, 'measurement')
    })

    AlertchangeStream.on('change', (change) => {
      // Notify the client about the change
      sendUpdate(change, 'alert')
    })

    // Handle client disconnect
    req.socket.on('close', () => {
      // Clean up resources and stop sending updates when the client disconnects
      clearInterval(intervalId)
      res.end()
    })
  } else {
    // Return a 404 response for non-SSE requests
    res.status(404).end()
  }
}