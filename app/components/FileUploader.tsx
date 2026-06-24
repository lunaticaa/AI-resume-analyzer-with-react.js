import {useCallback, useRef, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import formatSize from '../lib/utils'

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}


const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0] || null;
    setSelectedFile(file);
    onFileSelect?.(file)
  }, [onFileSelect])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    multiple: false,
    accept: {'application/pdf' : ['.pdf']},
    maxSize: 20 * 1024 * 1024,
  })

  const file = selectedFile;

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedFile(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    onFileSelect?.(null);
  }

  const inputProps = getInputProps() as any;
  const { ref, ...restInputProps } = inputProps;

  const handleInputRef = useCallback((node: HTMLInputElement | null) => {
    inputRef.current = node;
    if (!node || !ref) return;

    if (typeof ref === 'function') {
      ref(node);
    } else if (typeof ref === 'object' && ref !== null) {
      (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
    }
  }, [ref]);

  return (
    <div className='w-full gradient-border'>
       <div {...getRootProps()}>
      <input {...restInputProps} ref={handleInputRef} />
      <div className='space-y-4 cursor-pointer'>
        {file ? (
          <div className='uploader-selected-file' onClick={(e) => e.stopPropagation()}>
            <img src="/images/pdf.png" alt="pdf" className='size-10' />
            <div className='flex items-center space-x-3'>
            <div>
                <p className='text-sm font-medium text-gray-700 truncate max-w-xs'>{file.name}</p>
                <p className='text-sm text-gray-500'>({formatSize(file.size)})</p>
              </div>
            </div>
            <button type='button' className='p-2 cursor-pointer' onClick={handleRemove}>
              <img src="/icons/cross.svg" alt="remove" className='w-4 h-4' />
            </button>
          </div>
        ) : (
          <div>
            <div className="mx-auto w-16 h-16 items-center justify-center flex mb-2">
              <img src="/icons/info.svg" alt="upload" className='size-20' />
            </div>
            <p className="text-lg text-gray-500">
              <span className='font-semibold'>
                Click to upload
              </span> or drag and drop
            </p>
            <p className='text-lg text-gray-500'>PDF (max 20 MB)</p>
          </div>
        )}
      </div>
    </div>
    </div>
  )
}

export default FileUploader
