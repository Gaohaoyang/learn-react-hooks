import { useEffect } from 'react'

function useDocumentTitle(count: number) {
  useEffect(() => {
    document.title = `Count - ${count}`
  }, [count])
}

export default useDocumentTitle
