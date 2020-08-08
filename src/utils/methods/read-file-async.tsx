export function readFileURLAsync(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onabort = () => reject('upload aborted');
    reader.onerror = () => reject(reader.error)
    reader.onload = () => {
      resolve(reader.result! as string)
    }

    reader.readAsDataURL(file)
  })
}
