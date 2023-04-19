import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ReactStars from "react-rating-stars-component";
import ProductCard from "../components/ProductCard";
import Color from "../components/Color";
import Container from "../components/Container";
import { Slider } from "@mui/material";
import styled from "@emotion/styled";
const StyledSlider = styled(Slider)({
  color: "primary",
});
const Checkbox = ({ isChecked, label, checkHandler, index }) => {
  return (
    <div>
      <input
        type="checkbox"
        id={`checkbox-${index}`}
        checked={isChecked}
        onChange={checkHandler}
      />
      <label htmlFor={`checkbox-${index}`}>{label}</label>
    </div>
  )
}

const OurStore = () => {
  const navigate = useNavigate();
  const [authorsList, setAuthorsList] = useState([])
  const [manufacturersList, setManufacturersList] = useState([])  
  const [categoriesList, setCategoriesList] = useState([]);
  const [products, setProducts] = useState([]);
  const [grid, setGrid] = useState(4)
  const [page, setPage] = useState(1)
  const [categoryObj, setCategoryObj] = useState({
    ID: '',
    name: '',
    unique_name: ''
  });
  const location = useLocation() 
  const initialQueryParams = new URLSearchParams(location.search)
  const priceRange = [0, 1000000]
  const [currentPrice, setCurrentPrice] = useState(priceRange)
  const VNCurrencyFormatter = new Intl.NumberFormat('vi', {
    style: "currency",
    currency: "VND"
  })  
  const priceToQueryValue = priceRange => {
    return priceRange[0] + '-' + priceRange[1]
  }
  const handleViewPrice = () => {
    setFilters(prev => ({...prev, price: priceToQueryValue(currentPrice)}))
  }
  const updateAuthorsCheck = ID => {
    const newAuthorsList = authorsList.map((author) =>
      author.ID == ID
        ? { ...author, checked: !author.checked}
        : author
    )
    setAuthorsList(newAuthorsList)
    const checkedAuthorIDs = newAuthorsList.filter((author) => author.checked).map((author) => author.ID);
    const authorsIDFilter = checkedAuthorIDs.join('-');  
    // console.log(authorsIDFilter)
    setFilters(prev => ({...prev, authorID: authorsIDFilter}))
  }  
  const updateManuCheck = ID => {
    const newManusList = manufacturersList.map((manu) =>
      manu.ID == ID
        ? { ...manu, checked: !manu.checked}
        : manu
    )
    setManufacturersList(newManusList)
    const checkedManuIDs = newManusList.filter((manu) => manu.checked).map((manu) => manu.ID);
    const manusIDFilter = checkedManuIDs.join('-');  
    // console.log(manusIDFilter)
    setFilters(prev => ({...prev, manufacturerID: manusIDFilter}))    
  }    
  const [sorting, setSorting] = useState('')
  const handleSortingChange = e => {
    const selected = e.target.value
    setSorting(selected)
    const [order, dir] = selected.split('-');
    setFilters(prev => ({...prev, order: order, dir: dir}));    
  }

  const [filters, setFilters] = useState({})  
  // Fecth product filter option
  useEffect(() => {
    async function fetchProductFilter() {
      try {
        const response = (await axios.get("http://localhost/api/product-info-option.php")).data;
        const authorsListWithChecked = JSON.parse(response.authorsList).map((author) => ({
          ...author,
          checked: false,
        }));
        setAuthorsList(authorsListWithChecked);
  
        const manufacturersListWithChecked = JSON.parse(response.manufacturersList).map((manufacturer) => ({
          ...manufacturer,
          checked: false,
        }));
        setManufacturersList(manufacturersListWithChecked);
  
        setCategoriesList(JSON.parse(response.categoriesList));
  
        return response;
      } catch (error) {
        console.log(error);
      }
    }
  
    fetchProductFilter();
  }, []);
  
  // useEffect(() => {
  //   async function parseParam() {
  //     console.log("aaa", authorsList);
  //     console.log("bbb", manufacturersList);
  //     if (authorsList.length === 0 || manufacturersList.length === 0) return;
  //     console.log("cccc");
  //     const filterObj = {};
  //     // Parse author IDs
  //     const authorIDs = initialQueryParams.get("authorID");
  //     console.log(authorIDs);
  //     if (authorIDs) {
  //       console.log("ABC");
  //       filterObj.authorID = authorIDs;
  //       const authorIDArr = authorIDs.split("-").map((id) => parseInt(id));
  //       console.log(authorsList);
  //       setAuthorsList((prevAuthorsList) => {
  //         const newAuthorsList = prevAuthorsList.map((author) => ({
  //           ...author,
  //           checked: authorIDArr.includes(author.ID),
  //         }));
  //         return newAuthorsList;
  //       });
  //       console.log("CBA");
  //     }
  //     // Parse manufacturer ID
  //     const manufacturerIDs = initialQueryParams.get("manufacturerID");
  //     if (manufacturerIDs) {
  //       filterObj.manufacturerID = manufacturerIDs;
  //       const manuIDArr = manufacturerIDs.split("-").map((id) => parseInt(id));
  //       setManufacturersList((prevManufacturersList) => {
  //         const newManufacturersList = prevManufacturersList.map((manufacturer) => ({
  //           ...manufacturer,
  //           checked: manuIDArr.includes(manufacturer.ID),
  //         }));
  //         return newManufacturersList;
  //       });
  //     }
  //     // Parse price range
  //     const priceRange = initialQueryParams.get("price");
  //     if (priceRange) {
  //       filterObj.price = priceRange;
  //       const [min, max] = priceRange.split("-").map((price) => Number(price));
  //       setCurrentPrice([min, max]);
  //     }
  
  //     // Parse sorting order and direction
  //     const order = initialQueryParams.get("order");
  //     const dir = initialQueryParams.get("dir");
  //     if (order && dir) {
  //       filterObj.order = order;
  //       filterObj.dir = dir;
  //       setSorting(order + "-" + dir);
  //     }
  
  //     setFilters(filterObj);
  //   }
  
  //   parseParam();
  // }, [authorsList, manufacturersList]);
  

  const getCategoryObj = pathname => {
    const pathArray = pathname.split('/');
    const unique_name = pathArray.pop(); // retrieves the last element of the array
    for (const category of categoriesList) {
        if (category.unique_name === unique_name) {
            return category
        }
    }
  }    
  useEffect(() => {
    if (categoriesList.length > 0) {
      const category = getCategoryObj(location.pathname);
      if (category) {
        setCategoryObj(category)
        setFilters(prev => ({...prev, categoryID: category.ID}))
      }
    }
  }, [categoriesList]);    

  useEffect(() => {
    // console.log("aaa", authorsList)
    // console.log("bbb", manufacturersList)
    // if (authorsList.length === 0 || manufacturersList.length === 0)
    //   return
    // console.log("cccc")
    // const filterObj = {}
    // // Parse author IDs
    // const authorIDs = initialQueryParams.get('authorID')
    // console.log(authorIDs)
    // if (authorIDs) {
    //   console.log("ABC")
    //   filterObj.authorID = authorIDs
    //   const authorIDArr = authorIDs.split('-').map(id => parseInt(id));
    //   console.log(authorsList)
    //   const newAuthorsList = authorsList.map(author => ({
    //     ...author,
    //     checked: authorIDArr.includes(author.ID)
    //   }))
    //   console.log(newAuthorsList)
    //   setAuthorsList(newAuthorsList)
    //   console.log("CBA")
    // }   
    // // Parse manufacturer ID
    // const manufacturerIDs = initialQueryParams.get('manufacturerID')
    // if (manufacturerIDs) {
    //   filterObj.manufacturerID = manufacturerIDs
    //   const manuIDArr = manufacturerIDs.split('-').map(id => parseInt(id));
    //   setManufacturersList(prev => {
    //     return prev.map(manufacturer => ({
    //       ...manufacturer,
    //       checked: manuIDArr.includes(manufacturer.ID)
    //     }))
    //   })
    // }     
    // // Parse price range
    // const priceRange = initialQueryParams.get('price')
    // if (priceRange) {
    //   filterObj.price = priceRange
    //   const [min, max] = priceRange.split('-').map(price => Number(price))
    //   setCurrentPrice([min, max])
    // }
    

    // // Parse sorting order and direction
    // const order = initialQueryParams.get('order')
    // const dir = initialQueryParams.get('dir')
    // if (order && dir) {
    //   filterObj.order = order
    //   filterObj.dir = dir
    //   setSorting(order + '-' + dir)
    // }

    // setFilters(filterObj);    
  }, []);    

  // Fetch the filtered product data from the server
  useEffect(() => {
    console.log(filters)
    console.log(authorsList)
    const params = {...filters, page: page, categoryID: categoryObj.ID};
    // console.log(params);
    axios.get('http://localhost/api/products.php', {params: params})
      .then(response => {
        setProducts(response.data);
        // console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
    let paramsInURL = {...filters}
    // the path already include category so we don't need to have param categoryID
    delete paramsInURL.categoryID
    // also remove empty value attr
    paramsInURL = Object.fromEntries(
      Object.entries(paramsInURL)
        .filter(([key, value]) => value !== '' && value !== null && value !== undefined)
    );
    navigate(location.pathname + '?' + new URLSearchParams(paramsInURL).toString())
  }, [filters]);

  return (
    <>
      <Meta title={categoryObj.name} />
      <BreadCrumb title={categoryObj.name} />
      <Container class1="store-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-3">
            <div className="filter-card mb-3">
              <h3 className="filter-title">Lựa chọn thể loại</h3>
              <div>
                <ul className="ps-0">
                  {categoriesList.map(category => 
                    <li key={category.ID}>
                      <a href={"/category/" + category.unique_name}>
                        {category.name}
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Lọc theo</h3>
              <div>
                <h5 className="sub-title">Giá</h5>
                <div className="d-flex align-items-center gap-10">
                  <div className="container" style={{ width: '300px' }}>
                    <div className="row justify-content-center">
                      <div className="col-6">
                        <div style={{ margin: '5px' }}>{VNCurrencyFormatter.format(currentPrice[0])}</div>
                      </div>
                      <div className="col-6">
                        <div style={{ textAlign: 'right', margin: '5px' }}>{VNCurrencyFormatter.format(currentPrice[1])}</div>
                      </div>
                      <div className="col-12">
                        <div className="row d-flex justify-content-center">
                          <div style={{ width: '80%' }}>
                            <StyledSlider
                              value={currentPrice}
                              onChange={(e, newVal) => setCurrentPrice(newVal)}
                              step={10000}
                              min={priceRange[0]}
                              max={priceRange[1]}
                            />      
                          </div>
                          <div className="row d-flex align-items-center">
                            <button
                              className="button border-0"
                              type="button"
                              onClick={handleViewPrice}
                            >
                              Xem kết quả
                            </button>
                          </div>                          
                        </div>
                      </div>
                    </div>
                  </div>                  
                </div>
                <h5 className="sub-title">Tác giả</h5>
                <div>
                  {authorsList.map((author, index) => 
                    <Checkbox
                      key={author.ID}
                      isChecked={author.checked}
                      checkHandler={() => updateAuthorsCheck(author.ID)}
                      label={author.name}
                      index={index}
                    />  
                  )}
                </div>    
                <h5 className="sub-title">NXB/NSX</h5>
                <div>
                  {manufacturersList.map((manu, index) => 
                    <Checkbox
                      key={manu.ID}
                      isChecked={manu.checked}
                      checkHandler={() => updateManuCheck(manu.ID)}
                      label={manu.name}
                      index={index}
                    />  
                  )}
                </div>                                  
              </div>
            </div>
          </div> 
          <div className="col-9">
            <div className="filter-sort-grid mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-10">
                  <p className="mb-0 d-block" style={{ width: "100px" }}>
                    Sắp xếp theo
                  </p>
                  <select
                    value={sorting}
                    onChange={handleSortingChange}
                    className="form-control form-select"
                  >
                    <option value="sold_qty-dsc">Bán chạy nhất</option>
                    <option value="title-asc">A-Z</option>
                    <option value="title-dsc">Z-A</option>
                    <option value="price-asc">Giá thấp đến cao</option>
                    <option value="price-dsc">Giá cao đến thấp</option>
                  </select>
                </div>
                <div className="d-flex align-items-center gap-10">
                  <p className="totalproducts mb-0">21 Products</p>
                  <div className="d-flex gap-10 align-items-center grid">
                    <img
                      onClick={() => {
                        setGrid(3);
                      }}
                      src="images/gr4.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                    <img
                      onClick={() => {
                        setGrid(4);
                      }}
                      src="images/gr3.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                    <img
                      onClick={() => {
                        setGrid(6);
                      }}
                      src="images/gr2.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />

                    <img
                      onClick={() => {
                        setGrid(12);
                      }}
                      src="images/gr.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="products-list pb-5">
              <div className="d-flex gap-10 flex-wrap">
                {products.map(item => 
                  <ProductCard key={item.ID} product={item}/>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default OurStore;
