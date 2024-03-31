export type Device = {
  hostname: string; // Unique identifier
  ip: string; // IP address
  freeMemory: number; // Free memory
  rssi: number; //Signal strength
  status: boolean; //Connected or not
};
