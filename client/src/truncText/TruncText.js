export const truncateText = (text, length) => {
  const plainText = text
    .replace(/[#_*~`>[\]()\-+!]/g, '') 
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') 
    .replace(/!\[(.*?)\]\(.*?\)/g, '$1') 
  return plainText.length > length
    ? `${plainText.slice(0, length)}...`
    : plainText
}