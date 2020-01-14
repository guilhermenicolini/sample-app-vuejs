export default function color(color) {
  return {
    primary: color === 'primary',
    success: color === 'success',
    danger: color === 'danger',
    warning: color === 'warning',
    info: color === 'info',
    rose: color === 'rose',
    neutral: color === 'neutral'
  };
}
