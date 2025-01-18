import html2canvas from 'html2canvas';
import './download-image.scss'

const DownloadImage = () => {

  const downloadImage = async () => {
    const targetDiv = document.getElementsByClassName('diagram-component')[0] as HTMLElement;

    if (targetDiv) {
      const canvas = await html2canvas(targetDiv, {
        scale: 1, // Adjust scale for resolution
      });
      const image = canvas.toDataURL('image/png'); // Convert canvas to image URL
      const link = document.createElement('a');
      link.href = image;
      link.download = 'christmas-tree.png';
      link.click();
    }
  };

  return (
    <div>
      <button className="buttonCustom" onClick={downloadImage}>Download</button>
    </div>
  );
};

export default DownloadImage;
