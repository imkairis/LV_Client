const API_URL = import.meta.env.VITE_HOST;
const Image = ({ imgSrc, className, isServer = false }) => {
    const src = isServer ? API_URL + "/" + imgSrc : imgSrc;
    return <img className={className} src={src} alt={imgSrc} />;
};

export default Image;
