import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import ItemBlog from '../../component/Blog/ItemBlog';
import RightBlog from '../../component/Blog/RightBlog';
import { getAllBlog, getAllCategoryBlogService, getFeatureBlog } from '../../services/userService';
import { PAGINATION } from '../../utils/constant';

function BlogPage(props) {
  const [dataBlog, setdataBlog] = useState([]);
  const [dataFeatureBlog, setdataFeatureBlog] = useState([]);
  const [dataSubject, setdataSubject] = useState([]);
  const [count, setCount] = useState('');
  const [subjectId, setsubjectId] = useState('');
  const [keyword, setkeyword] = useState('');

  useEffect(() => {
    try {
      window.scrollTo(0, 0);
      loadCategoryBlog();
      fetchData('', keyword);
      loadFeatureBlog();
    } catch (error) {
      console.log(error);
    }
  }, [keyword]);

  const fetchData = async (code, keyword) => {
    let arrData = await getAllBlog({
      subjectId: code,
      limit: PAGINATION.pagerow,
      offset: 0,
      keyword: keyword
    });
    if (arrData && arrData.errCode === 0) {
      setdataBlog(arrData.data);
      setCount(Math.ceil(arrData.count / PAGINATION.pagerow));
    }
  };

  const loadFeatureBlog = async () => {
    let res = await getFeatureBlog(6);
    if (res && res.errCode === 0) {
      setdataFeatureBlog(res.data);
    }
  };

  const loadCategoryBlog = async () => {
    let res = await getAllCategoryBlogService('SUBJECT');
    if (res && res.errCode === 0) {
      setdataSubject(res.data);
    }
  };

  const handleChangePage = async (number) => {
    setsubjectId(subjectId);
    let arrData = await getAllBlog({
      subjectId: subjectId,
      limit: PAGINATION.pagerow,
      offset: number.selected * PAGINATION.pagerow,
      keyword: keyword
    });
    if (arrData && arrData.errCode === 0) {
      setdataBlog(arrData.data);
    }
  };

  const handleClickCategory = (code) => {
    setsubjectId(code);
    fetchData(code, '');
  };

  const handleSearchBlog = (text) => {
    fetchData('', text);
    setkeyword(text);
  };

  const handleOnchangeSearch = (keyword) => {
    if (keyword === '') {
      fetchData('', keyword);
      setkeyword(keyword);
    }
  };

  return (
    <>
      <section className="banner_area">
        <div className="banner_inner d-flex align-items-center">
          <div className="container">
            <div className="banner_content d-md-flex justify-content-between align-items-center">
              <div className="mb-3 mb-md-0">
                <h2>Tin tức</h2>
                <p>Hãy theo dõi những bài viết để nhận được thông tin mới nhất</p>
              </div>
              <div className="page_link">
                <Link to={"/"}>Trang chủ</Link>
                <Link to={"/blog"}>Tin tức</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="blog_area section_gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mb-5 mb-lg-0">
              <div className="blog_left_sidebar">
                {dataBlog && dataBlog.length > 0 &&
                  dataBlog.map((item, index) => {
                    return (
                      <ItemBlog key={index} data={item}></ItemBlog>
                    );
                  })}
              </div>
              <ReactPaginate
                previousLabel={'Quay lại'}
                nextLabel={'Tiếp'}
                breakLabel={'...'}
                pageCount={count}
                marginPagesDisplayed={3}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakLinkClassName={"page-link"}
                breakClassName={"page-item"}
                activeClassName={"active"}
                onPageChange={handleChangePage}
              />
            </div>
            <RightBlog
              handleOnchangeSearch={handleOnchangeSearch}
              handleSearchBlog={handleSearchBlog}
              dataFeatureBlog={dataFeatureBlog}
              isPage={true}
              handleClickCategory={handleClickCategory}
              data={dataSubject}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default BlogPage;
