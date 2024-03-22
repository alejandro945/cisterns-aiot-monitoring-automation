import { NextApiRequest, NextApiResponse } from 'next'
import { changeStream } from '@/infrastructure/database/mongo-client.database'

// setupChangeStream()

const HEARTBEAT_INTERVAL = 5000 // 5 seconds (adjust this as needed)

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check if the client accepts SSE

  if (req.headers.accept && req.headers.accept === 'text/event-stream') {
    // Set SSE headers
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    const intervalId = setInterval(() => {
      // Send a heartbeat message to keep the connection alive
      res.write(': heartbeat\n\n')
    }, HEARTBEAT_INTERVAL)

    // Send real-time updates to the client
    const sendUpdate = (data: { [key: string]: string }) => {
      const event = `data: ${JSON.stringify(data)}\n\n`
      res.write(event)
    }

    changeStream.on('change', (change) => {
      // Notify the client about the change
      sendUpdate(change)
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