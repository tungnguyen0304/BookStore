import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import BreadCrumb from "../../components/BreadCrumb";
import Meta from "../../components/Meta";
import ProductCard from "../../components/ProductCard";
import Container from "../../components/Container";

const Checkbox = ({ isChecked, label, checkHandler, index }) => {
  return (
    <div>
      <input
        type="checkbox"
        id={`checkbox-${index}`}
        checked={isChecked}
        onChange={checkHandler}
      />
      <label htmlFor={`checkbox-${index}`} style={{marginLeft: '5px', fontSize: '14px'}}>{label}</label>
    </div>
  )
}

const OurStore = () => {
  const navigate = useNavigate();
  const [authorsList, setAuthorsList] = useState([])
  const [manufacturersList, setManufacturersList] = useState([])  
  const [categoriesList, setCategoriesList] = useState([]);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1)
  const [remainQty, setRemainQty] = useState(0)
  const [currentCategory, setCurrentCategory] = useState({
    ID: '',
    name: '',
    unique_name: ''
  });
  const location = useLocation() 
  const priceRanges = [
    [0, 150000],
    [150000, 300000],
    [300000, 500000],
    [500000, 700000],
    [700000, 10000000]
  ]
  const [currentPrice, setCurrentPrice] = useState([0,10000000])
  const VNCurrencyFormatter = new Intl.NumberFormat('vi', {
    style: "currency",
    currency: "VND"
  })  
  const handleChangePrice = (value) => {
    // reset page & products
    setPage(1);
    setProducts([]);
    if (!value.every((item, index) => item === currentPrice[index])) {
      setCurrentPrice(value);
      setFilters((prev) => ({ ...prev, price: value[0] + "-" + value[1] }));
    } else {
      setCurrentPrice([0,10000000]);
      setFilters((prev) => ({ ...prev, price: "" }));
    }
  };
  
  const updateAuthorsCheck = ID => {
    // reset page & products
    setPage(1)
    setProducts([])    
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
    // reset page & products
    setPage(1)
    setProducts([])    
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
    // reset page & products
    setPage(1)
    setProducts([])
    // get value     
    const selected = e.target.value
    setSorting(selected)
    const [order, dir] = selected.split('-');
    setFilters(prev => ({...prev, order: order, dir: dir}));    
  }

  const handleNextPage = () => {
    const newPage = page + 1
    setPage(newPage)
    setFilters(prev => ({...prev, page: newPage}))
  }  
  
  const [filters, setFilters] = useState({})  
  // Fecth product filtering options and parse initial URL
  useEffect(() => {
    let fetchedAuthorsList = []
    let fetchedManusList = []
    let fetchedCatesList = []
    const filterObj = {}

    async function fetchProductFilter() {
      try {
        const response = (await axios.get("http://localhost/api/product-info-option.php")).data;
        fetchedAuthorsList = JSON.parse(response.authorsList).map((author) => ({
          ...author,
          checked: false,
        }));
        setAuthorsList(fetchedAuthorsList);
  
        fetchedManusList = JSON.parse(response.manufacturersList).map((manufacturer) => ({
          ...manufacturer,
          checked: false,
        }));
        setManufacturersList(fetchedManusList);
        
        fetchedCatesList = JSON.parse(response.categoriesList)
        setCategoriesList(fetchedCatesList);
  
        return response;
      } catch (error) {
        console.log(error);
      }
    }
    async function parseParam() {
      if (fetchedAuthorsList.length === 0 || fetchedManusList.length === 0) 
        return;
      const initialQueryParams = new URLSearchParams(location.search)
      // Parse author IDs
      const authorIDs = initialQueryParams.get("authorID");
      if (authorIDs) {
        filterObj.authorID = authorIDs;
        const authorIDArr = authorIDs.split("-").map((id) => parseInt(id));
        setAuthorsList(fetchedAuthorsList.map((author) => ({
            ...author,
            checked: authorIDArr.includes(author.ID),
          }
        )));
      }
      // Parse manufacturer ID
      const manufacturerIDs = initialQueryParams.get("manufacturerID");
      if (manufacturerIDs) {
        filterObj.manufacturerID = manufacturerIDs;
        const manuIDArr = manufacturerIDs.split("-").map((id) => parseInt(id));
        setManufacturersList(fetchedManusList.map((manufacturer) => ({
            ...manufacturer,
            checked: manuIDArr.includes(manufacturer.ID),
          }
        )));
      }
      // Parse price range
      const priceRange = initialQueryParams.get("price");
      if (priceRange) {
        filterObj.price = priceRange;
        const [min, max] = priceRange.split("-").map((price) => Number(price));
        setCurrentPrice([min, max]);
      }
  
      // Parse sorting order and direction
      const order = initialQueryParams.get("order");
      const dir = initialQueryParams.get("dir");
      if (order && dir) {
        filterObj.order = order;
        filterObj.dir = dir;
        setSorting(order + "-" + dir);
      }
    }      
    async function setCurrentCategoryFromURL() {
      const currentCategory = getCategoryObj(location.pathname, fetchedCatesList)
      if (currentCategory) {
        setCurrentCategory(currentCategory)
        filterObj.categoryID = currentCategory.ID
      }
    }
    const getCategoryObj = (pathname, categoriesList) => {
      const pathArray = pathname.split('/');
      const unique_name = pathArray.pop(); // retrieves the last element of the array
      for (const category of categoriesList) {
          if (category.unique_name === unique_name) {
              return category
          }
      }
    }
    async function setFiltersObj() {
      setFilters(filterObj)
    }
    
    // fecth authors/manus first then parse param later
    fetchProductFilter().then(parseParam).then(setCurrentCategoryFromURL).then(setFiltersObj)    
  }, []);

  // Fetch new product data from the server everytime the filters change
  useEffect(() => {
    if (Object.keys(filters).length !== 0) {
      const params = {...filters, page: page, categoryID: currentCategory.ID};
      console.log(params);
      axios.get('http://localhost/api/products.php', {params: params})
        .then(response => {
          setProducts(prev => [...prev, ...response.data.products])
          setRemainQty(response.data.remain_qty)
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
    }
  }, [filters]);

  return (
    <>
      <Meta title={currentCategory.name} />
      <BreadCrumb title={currentCategory.name} />
      <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12 col-md-2">
            <div className="filter-card mb-3">
              <h3 className="filter-title">THỂ LOẠI</h3>
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
              <h3 className="filter-title">LỌC THEO</h3>
              <div>
                <h5 className="sub-title">GIÁ</h5>
                <div>
                  {priceRanges.map((range, index) => (
                    <Checkbox
                      key={index}
                      isChecked={currentPrice[0] === range[0] && currentPrice[1] === range[1]}
                      checkHandler={() => handleChangePrice(range)}
                      label={range[1] === 10000000 ? `${VNCurrencyFormatter.format(range[0])} - Trở lên` : `${VNCurrencyFormatter.format(range[0])} - ${VNCurrencyFormatter.format(range[1])}`}
                      index={index}
                    />      
                  ))}
                </div>
                <h5 className="sub-title">TÁC GIẢ</h5>
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
          <div className="col-12 col-md-10">
            <div className="filter-sort-grid mb-4">
              <div className="d-inline-block mx-2">Sắp xếp theo</div>
              <div className="d-inline-block">
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
            </div>
            
            {products.length !== 0 ? (
            <div className="products-list pb-5">
              <div className="d-flex flex-wrap">
                {products.map(product => 
                  <div key={product.ID} className="col-6 col-sm-4 col-md-3 mb-1 p-1">
                    <ProductCard product={product}/>
                  </div>
                )}
              </div>
              {remainQty > 0 && (
              <div className="text-center">
                <button 
                  className="btn btn-primary btn-md" 
                  onClick={handleNextPage}
                > 
                    Xem thêm {remainQty} sản phẩm
                </button>
              </div>
              )}
            </div>
            ) : (
              <div className='text-center lead'>Không có sản phẩm nào</div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default OurStore;
