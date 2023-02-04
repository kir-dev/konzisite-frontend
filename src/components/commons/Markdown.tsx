import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import ReactMarkdown from 'react-markdown'
import remarkGemoji from 'remark-gemoji'
import remarkGfm from 'remark-gfm'

const Markdown = ({ markdown }: { markdown?: string }) => {
  return <ReactMarkdown components={ChakraUIRenderer()} children={markdown || ''} remarkPlugins={[remarkGfm, remarkGemoji]} />
}

export default Markdown
