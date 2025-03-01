import { userAgent } from "next/server";
import { headers } from "next/headers";

export default async function getDeviceType(): Promise<"mobile" | "desktop"> {
  const { device } = userAgent({ headers: await headers() });
  const deviceType = device?.type === "mobile" ? "mobile" : "desktop";

  return deviceType;
}
