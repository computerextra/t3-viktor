import SFTPClient from "ssh2-sftp-client";
import { env } from "@/env";
import { BildServer } from "@/types";

export async function uploadImageToFTP(
  imageData: BildServer,
  mitarbeiterId: string,
  imageNumber: 1 | 2 | 3,
): Promise<string | null> {
  if (!imageData) {
    return null;
  }

  const sftp = new SFTPClient();

  const tryConnect = async (port: number) => {
    try {
      await sftp.connect({
        host: env.FTP_HOST,
        port,
        username: env.FTP_USER,
        password: env.FTP_PASSWORD,
      });
      return;
    } catch (err: any) {
      console.warn(
        `connection attempt to port ${port} failed:`,
        err.message || err,
      );
      throw err;
    }
  };

  try {
    const initialPort = env.FTP_PORT || 22;
    try {
      await tryConnect(initialPort);
    } catch (firstErr) {
      if (initialPort !== 22) {
        await tryConnect(22);
      } else {
        throw firstErr;
      }
    }

    const filename = `${mitarbeiterId}-${imageNumber}.${imageData.type}`;

    const buffer = Buffer.from(imageData.data, "base64");

    // construct remote path and ensure directory exists
    const base = env.FTP_BASE_PATH || "";
    const remotePath = `${base.endsWith("/") ? base : base + "/"}${filename}`;

    // make sure directory is present (ssh2-sftp-client mkdir is recursive)
    const path = require("path");
    const remoteDir = path.posix.dirname(remotePath);
    try {
      await sftp.mkdir(remoteDir, true);
    } catch (mkdirErr: any) {
      // mkdir may throw if directory already exists; ignore
      if (mkdirErr.code !== 4) {
        console.warn("mkdir warning", mkdirErr.message || mkdirErr);
      }
    }

    // upload buffer directly
    await sftp.put(buffer, remotePath);

    const imageUrl = env.IMAGE_URL.endsWith("/")
      ? `${env.IMAGE_URL}${filename}`
      : `${env.IMAGE_URL}/${filename}`;

    return imageUrl;
  } catch (err) {
    console.error("Error uploading image via SFTP:", err);
    throw err;
  } finally {
    try {
      await sftp.end();
    } catch (e) {
      console.error("Error closing SFTP connection:", e);
    }
  }
}
