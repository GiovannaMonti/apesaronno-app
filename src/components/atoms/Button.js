export const Button = ({ url, color, size }) => {
  return (
    <button className={`a-button a-button--${color} a-button--${size} link`}>
      <a href={url}>Scopri i servizi</a>
    </button>
  )
}
