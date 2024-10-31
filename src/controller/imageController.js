import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'dntr1veuc',
    api_key: '994749765761535',
    api_secret: 'xdkimdXBZXDNFgkIokPue1fDqM8'
});

export const uploadImage = (req, res) => {
    const file = req.file;

    if (!file) {
        return res.status(400).json({ error: 'Không có tệp được tải lên.' });
    }
    const dataUrl = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
    const fileName = file.originalname.split('.')[0];

    cloudinary.uploader.upload(dataUrl, {
        public_id: fileName,
        resource_type: 'auto',
    }, (err, result) => {
        if (result) {
            console.log(result.secure_url);
        }
    });
    res.json({ message: 'Tệp được tải lên thành công.', data: file });
};