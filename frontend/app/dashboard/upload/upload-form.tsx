"use client";

import { useId, useRef, useState } from "react";
import { CloudUpload, FileImage, Info, ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const acceptedTypes = ["image/png", "image/jpeg", "image/webp"];

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function UploadForm() {
  const inputId = useId();
  const noteId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const BackendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

  function selectFile(nextFile: File | undefined) {
    setNotice(null);

    if (!nextFile) {
      return;
    }

    if (!acceptedTypes.includes(nextFile.type)) {
      setError("Choose a PNG, JPG, or WebP image.");
      setFile(null);
      return;
    }

    setError(null);
    setFile(nextFile);
  }

  function removeFile() {
    setFile(null);
    setNotice(null);
    setError(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }
  async function sendFile() {
    if (!file) {
      setError("Select an image before uploading.");
      return;
    }
    setUploading(true);
    setError(null);
    setNotice(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch(`${BackendURL}/studies`, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.detail || "Upload failed. Please try again.");
      }
      setNotice(
        `Upload successful! Study ID: ${result.id}. Status: ${result.status}.`,
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not connect to the backend.",
      );
    } finally {
      setUploading(false);
    }
  }
  return (
    <form
      className="space-y-5"
      onSubmit={(event) => {
        event.preventDefault();
        void sendFile();
      }}
    >
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          selectFile(event.dataTransfer.files?.[0]);
        }}
        className={cn(
          "rounded-xl border border-dashed p-6 transition-colors sm:p-10",
          dragging
            ? "border-accent bg-accent-soft/60"
            : "border-hairline bg-plate/35",
        )}
      >
        <div className="mx-auto flex max-w-md flex-col items-center text-center">
          <span className="grid size-12 place-items-center rounded-xl border border-hairline bg-card text-accent-ink shadow-sm">
            <CloudUpload className="size-5" aria-hidden />
          </span>
          <p className="mt-4 text-sm font-medium text-ink">
            Upload a chest X-ray
          </p>
          <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
            Drag an image here, or choose a file from your device. This is a
            front-end demo — files never leave your browser.
          </p>

          <input
            ref={inputRef}
            id={inputId}
            type="file"
            accept={acceptedTypes.join(",")}
            className="sr-only"
            onChange={(event) => selectFile(event.target.files?.[0])}
          />

          <label
            htmlFor={inputId}
            className="mt-4 inline-flex h-9 cursor-pointer items-center gap-2 rounded-lg border border-hairline bg-card px-3 text-xs font-medium text-ink transition-colors hover:bg-plate focus-within:ring-2 focus-within:ring-accent/30"
          >
            <FileImage className="size-4" aria-hidden />
            Choose image
          </label>
          <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
            PNG · JPG · WebP
          </p>
        </div>
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[11px] text-red-700"
        >
          {error}
        </p>
      )}

      {file && (
        <div className="flex items-center gap-3 rounded-xl border border-hairline bg-card p-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-600">
            <FileImage className="size-4" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-ink">{file.name}</p>
            <p className="mt-0.5 text-[10px] text-muted-foreground">
              {formatFileSize(file.size)} · Selected locally
            </p>
          </div>
          <button
            type="button"
            onClick={removeFile}
            aria-label={`Remove ${file.name}`}
            className="grid size-7 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-plate hover:text-ink"
          >
            <X className="size-3.5" aria-hidden />
          </button>
        </div>
      )}

      <div>
        <label htmlFor={noteId} className="block text-xs font-medium text-ink">
          Study note{" "}
          <span className="font-normal text-muted-foreground">(optional)</span>
        </label>
        <textarea
          id={noteId}
          rows={3}
          placeholder="Add fictional context for this demo study..."
          maxLength={280}
          className="mt-2 w-full resize-y rounded-lg border border-hairline bg-card px-3 py-2.5 text-xs leading-relaxed text-ink placeholder:text-muted-foreground/80 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
        />
      </div>

      <div className="flex items-start gap-2 rounded-lg border border-hairline bg-plate/55 px-3 py-2.5">
        <ShieldCheck
          className="mt-0.5 size-3.5 shrink-0 text-accent-ink"
          aria-hidden
        />
        <p className="text-[11px] leading-relaxed text-muted-foreground">
          Do not use real patient images or identifiers. This prototype does not
          upload, store, or analyze files, and does not produce diagnoses.
        </p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <Button
          type="submit"
          className="h-10 px-4 text-xs"
          disabled={!file || uploading}
        >
          <CloudUpload className="size-4" aria-hidden />
          {uploading ? "Uploading..." : "Upload study"}
        </Button>
      </div>

      {notice && (
        <p
          role="status"
          aria-live="polite"
          className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-[11px] leading-relaxed text-blue-800"
        >
          {notice}
        </p>
      )}
    </form>
  );
}
