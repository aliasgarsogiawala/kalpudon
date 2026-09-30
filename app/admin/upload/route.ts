import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { isAdmin } from "../../_lib/session";

// Files go straight from the admin's browser to Vercel Blob (no size limit from our server); this route
// only hands out an upload token, and only to a signed-in admin.
export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody;
  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!(await isAdmin())) throw new Error("Sign in to upload.");
        if (!pathname.startsWith("cms/uploads/")) throw new Error("Uploads go in cms/uploads/.");
        return {
          allowedContentTypes: ["image/jpeg", "image/png", "image/webp", "image/avif", "application/pdf", "application/zip", "video/mp4"],
          maximumSizeInBytes: 500 * 1024 * 1024,
          addRandomSuffix: true,
        };
      },
    });
    return Response.json(result);
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 400 });
  }
}
