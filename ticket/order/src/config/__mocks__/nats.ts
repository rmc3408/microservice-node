export const stan = {
  client: {
    publish: jest.fn().mockImplementation(
      (subject: string, data: string, callback: () => void) => {
        console.log('Mocked NATS client publish')
        callback()
    }),
  },
  connect: jest.fn(),
  close: jest.fn(),
}