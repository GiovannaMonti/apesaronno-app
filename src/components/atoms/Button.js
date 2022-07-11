export const Button = ({ label, url, color, size }) => {
  return (
    <button className={`a-button a-button--${color} a-button--${size} link`}>
      <a href={url}>{label}</a>
    </button>
  )
}
