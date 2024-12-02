import { baseUrl } from "../constants";

export const setUp = async (os, chain, privateKey, infuraKey, buildType) => {
  try {
    const response = await fetch(`${baseUrl}/comm/setup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer your-auth-token",
        "ngrok-skip-browser-warning": "69420",
      },
      body: JSON.stringify({
        os: os,
        chain: chain,
        private_key: privateKey,
        infura_api_key: infuraKey,
        build: buildType,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.msg || "Acc failed to create");
    }

    const result = await response.json();
    console.log("setup completed:", result);
    return result;
  } catch (error) {
    console.error("setup error:", error);
  }
};
