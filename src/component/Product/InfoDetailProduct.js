import React, { useEffect, useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addItemCartStart } from '../../action/ShopCartAction';
import './InfoDetailProduct.scss';
import CommonUtils from '../../utils/CommonUtils';

function InfoDetailProduct(props) {
    let { dataProduct, sendDataFromInforDetail, userId } = props;
    let [arrDetail, setarrDetail] = useState([]);
    const [productDetail, setproductDetail] = useState([]);
    const [isOpen, setisOpen] = useState(false);
    const [imgPreview, setimgPreview] = useState('');
    const [activeLinkId, setactiveLinkId] = useState('');
    const [quantity, setquantity] = useState('');
    const [quantityProduct, setquantityProduct] = useState(1);

    useEffect(() => {
        if (dataProduct) {
            let { productDetail } = dataProduct;
            if (productDetail) {
                setproductDetail(productDetail);
                setarrDetail(productDetail[0]);
                setactiveLinkId(productDetail[0].productDetailSize[0].id);
                setquantity(productDetail[0].productDetailSize[0].stock);
                sendDataFromInforDetail(productDetail[0].productDetailSize[0]);
            }
        }
    }, [dataProduct, sendDataFromInforDetail]);

    let handleSelectDetail = (event) => {
        setarrDetail(productDetail[event.target.value]);
        if (productDetail[event.target.value] && productDetail[event.target.value].productDetailSize.length > 0) {
            setactiveLinkId(productDetail[event.target.value].productDetailSize[0].id);
            setquantity(productDetail[event.target.value].productDetailSize[0].stock);
            sendDataFromInforDetail(productDetail[event.target.value].productDetailSize[0]);
        }
    }

    let openPreviewImage = (url) => {
        setimgPreview(url);
        setisOpen(true);
    }

    let handleClickBoxSize = (data) => {
        setactiveLinkId(data.id);
        setquantity(data.stock);
        sendDataFromInforDetail(data);
    }

    const dispatch = useDispatch();

    let handleAddShopCart = () => {
        if (userId) {
            dispatch(addItemCartStart({
                userId: userId,
                productdetailsizeId: activeLinkId,
                quantity: quantityProduct,
            }));
        } else {
            toast.error("Đăng nhập để thêm vào giỏ hàng");
        }
    }

    return (
        <div className="row s_product_inner">
            <div className="col-lg-6">
                <div className="s_product_img">
                    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                        <div>
                            <ol className="carousel-indicators">
                                {arrDetail.productImage && arrDetail.productImage.map((item, index) => (
                                    <li key={index} data-target="#carouselExampleIndicators" data-slide-to={index} className={index === 0 ? "active" : ""}>
                                        <img height="60px" className="w-100" src={item.image} alt="" />
                                    </li>
                                ))}
                            </ol>
                        </div>
                        <div className="carousel-inner">
                            {arrDetail.productImage && arrDetail.productImage.map((item, index) => (
                                <div key={index} onClick={() => openPreviewImage(item.image)} style={{ cursor: 'pointer' }} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                    <img className="d-block w-100" src={item.image} alt="Ảnh bị lỗi" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-5 offset-lg-1">
                <div className="s_product_text">
                    <h3>{dataProduct.name}</h3>
                    <h2>{CommonUtils.formatter.format(arrDetail.discountPrice)}</h2>
                    <ul className="list">
                        <li>
                            <span>Loại</span>: {dataProduct.categoryData?.value || ''}
                        </li>
                        <li>
                            <span>Trạng thái</span>: {quantity > 0 ? 'Còn hàng' : 'Hết hàng'}
                        </li>
                        <li>
                            <div className="box-size">
                                <span>Size</span>
                                {arrDetail.productDetailSize && arrDetail.productDetailSize.map((item, index) => (
                                    <div key={index} onClick={() => handleClickBoxSize(item)} className={item.id === activeLinkId ? 'product-size active' : 'product-size'}>
                                        {item.sizeData.value}
                                    </div>
                                ))}
                            </div>
                        </li>
                        <li>
                            {quantity} sản phẩm có sẵn
                        </li>
                    </ul>
                    <p>
                        {arrDetail.description}
                    </p>
                    <div style={{ display: 'flex' }}>
                        <div className="product_count">
                            <label htmlFor="qty">Số lượng</label>
                            <input type="number" value={quantityProduct} onChange={(event) => setquantityProduct(event.target.value)} min="1" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="type" style={{ fontSize: '14px', color: '#797979', fontFamily: '"Roboto",sans-serif', marginLeft: '16px' }}>Loại sản phẩm</label>
                            <select onChange={handleSelectDetail} className="sorting" name="type" style={{ outline: 'none', border: '1px solid #eee', marginLeft: '16px' }}>
                                {productDetail.map((item, index) => (
                                    <option key={index} value={index}>{item.nameDetail}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="card_area">
                        <button className="main_btn" onClick={handleAddShopCart}>Thêm vào giỏ</button>
                        <button className="icon_btn" onClick={() => console.log('Add to wishlist')}>
                            <i className="lnr lnr lnr-heart" />
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <Lightbox mainSrc={imgPreview} onCloseRequest={() => setisOpen(false)} />
            )}
        </div>
    );
}

export default InfoDetailProduct;
