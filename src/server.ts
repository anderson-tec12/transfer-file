import Client from 'ssh2-sftp-client'
import { env } from './env';



async function ListItensServer(server: Client) {
  return server.list('/home/ubuntu/build');
}

async function getFiles(server: Client) {
  server.on('download', info => {
    console.log(`Listener: Download ${info.source}`);
  });

  await server.downloadDir('/home/ubuntu/build', './BKP');

  console.log('### COPY OK')
}

async function setFiles(server: Client) {
  server.on('upload', (info) => {
    console.log(`Listener: Uploaded ${info.source}`);
  })

  await server.uploadDir('./upload', '/home/ubuntu/build');

  console.log('ok')
}

(async () => {
  const server = new Client()

  await server.connect({
    host: env.SFTP_HOST,
    port: env.SFTP_PORT,
    username: env.SFTP_USERNAME,
    password: env.SFTP_PASS,

  })

  const files = await ListItensServer(server)

  console.log({ files })

  await getFiles(server)
  await setFiles(server)

})()