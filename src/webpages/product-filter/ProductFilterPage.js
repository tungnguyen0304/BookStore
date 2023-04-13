import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Grid, MenuItem, Select, Slider } from '@mui/material';
import { styled } from '@mui/material/styles';
import PopupButton from './PopupButton';
import { SndLayerButton } from '../button-theme/ButtonTheme';
import FilteringQuitButton from './FilteringQuitButton';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';

const CustomSelect = styled(Select)({
    borderRadius: '15px',
    backgroundColor: '#F2F4F4',
    color: '#11224E',
    fontSize: 'small',
    height: '35px',
    borderStyle: 'none',
    boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
    ".MuiOutlinedInput-notchedOutline": { border: 0 },
    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
      {
        border: 0,
      },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
      {
        border: 0,
      },    
});
const filterTypeLabel = {
    fontSize: 'small',
    fontWeight: 'bold',
    marginTop: '10px'
}
const StyledSlider = styled(Slider)({
  color: "#3f51b5",
});

const isBook = pathname => {
  const bookCategories = ["sach-trong-nuoc", "sach-ngoai-quoc"]
  const slashIndex = pathname.indexOf('/');
  pathname = pathname.substr(slashIndex + 1)
  return bookCategories.includes(pathname)
}

function ProductFilterPage() {
  const navigate = useNavigate();
  const [authorsList, setAuthorsList] = useState([])
  const [manufacturersList, setManufacturersList] = useState([])
  const [categoriesList, setCategoriesList] = useState([])
  const location = useLocation();
  const [page, setPage] = useState(0)
  const [categoryObj, setCategoryObj] = useState({
    ID: '',
    name: '',
    unique_name: ''
  });
  
  useEffect(() => {
    axios.get('http://localhost/api/product-info-option.php')
      .then(response => {
        return response.data;
      })
      .then(response => {
        setAuthorsList(JSON.parse(response.authorsList));
        setManufacturersList(JSON.parse(response.manufacturersList));
        setCategoriesList(JSON.parse(response.categoriesList));
      }) 
      .catch(error => {
        console.log(error);
      });
  }, []);
  const getCategoryObj = pathname => {
    const slashIndex = pathname.indexOf('/');
    const unique_name = pathname.substr(slashIndex + 1)
    for (const category of categoriesList) {
        if (category.unique_name === unique_name) {
            return category
        }
    }
  }  
  useEffect(() => {
    if (categoriesList.length > 0) {
      const category = getCategoryObj(location.pathname);
      setCategoryObj(category);
    }
  }, [categoriesList, location.pathname]);  
  const priceRange = [0, 10000000]
  const [currentPrice, setCurrentPrice] = useState(priceRange)
  const priceToQueryValue = priceRange => {
    return priceRange[0] + '-' + priceRange[1]
  }

  // Parse the filter parameters from the URL query string
  const [filters, setFilters] = useState({})
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const filterObj = {}
    for (let [key, value] of queryParams.entries()) {
      if (key === 'authorID' || key === 'manufacturerID') {
        value = parseInt(value)
      }
      filterObj[key] = value;
    }
    setFilters(filterObj);
  }, []); // empty array means it just run on mount (on load)

  // Fetch the filtered product data from the server
  const [products, setProducts] = useState([])
  useEffect(() => {
    const params = {...filters, page: page, categoryID: categoryObj.ID};
    console.log(params);
    axios.get('http://localhost/api/products.php', {params: params})
      .then(response => {
        // setProducts(response.data);
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
  }, [filters]);

  const sortingAttributes = ['filter_price', 'sold_quantity']
  // Handle changes to the filter parameters
  const handleFilterChange = (event) => {
    let newFilters
    if (sortingAttributes.includes(event.target.name)) {
      newFilters = {...filters, ['order']: event.target.name, ['dir']: event.target.value}
    } else {
      newFilters = {...filters, [event.target.name]: event.target.value }
    }
    setFilters(newFilters)
    navigate(location.pathname + '?' + new URLSearchParams(newFilters).toString())
  };
  const getLabelsCurrentFilter = () => {
    const res = []
    let hasSoldQuantity = false
    Object.entries(filters).forEach(([key, value]) => {
      if (key === 'authorID') {
        const authorEntry = authorsList.filter(author => author.ID === value)[0]
        if (authorEntry !== undefined) {
          res.push({key: key, label: "Tác giả: " + authorEntry.name})
        }
      } else if (key === 'manufacturerID') {
        const name = isBook(location.pathname) ? "Nhà xuất bản" : "Nhà sản xuất"
        const manufacturerEntry = manufacturersList.filter(man => man.ID === value)[0]
        if (manufacturerEntry !== undefined) {
          res.push({key: key, label: name + ': ' + manufacturerEntry.name})
        }
      } else if (key === 'price') {
        res.push({key: key, label: "Giá: " + value})
      } else if (value === 'sold_quantity') {
        hasSoldQuantity = true
        res.push({key: 'order', label: "Bán chạy nhất"})
      } else if (key === 'dir') {
        if (!hasSoldQuantity)
          res.push({key: 'order', label: value === 'asc' ? 'Giá tăng dần' : 'Giá giảm dần'})
      }
    })
    return res
  }  

  // Render the filter form and product data
  return (
    <>
    <Grid container>
      <Grid item xs={12}>
        <div className='pageTitle'>{categoryObj.name}</div>
      </Grid>    
    </Grid>       
    <Grid container>
        <Grid item xs={12}>
            <div style={filterTypeLabel}>Thể loại hiện tại</div>
            <CustomSelect
                id="category-select"
                value={location.pathname}
                size='small'         
            >
                {categoriesList.map((category, index) => (
                    <MenuItem 
                    key={index} 
                    value={'/' + category.unique_name} 
                    onClick={() => {
                      navigate('/' + category.unique_name)
                      setFilters({categoryID: category.ID})
                    }}
                    >
                        {category.name}                    
                    </MenuItem>
                ))}
            </CustomSelect>
        </Grid>
        <Grid item xs={12}>
            <div style={filterTypeLabel}>Chọn theo tiêu chí</div>
            <Grid container spacing={4}>
            <Grid item>
            <PopupButton label="Chọn tác giả" highlightcolor={filters["authorID"] ? "red" : undefined}>
            {authorsList.map((author, index) => (
                <MenuItem 
                key={index} 
                onClick={() => handleFilterChange({target: {name: 'authorID', value: author.ID}})}>
                    {author.name}                    
                </MenuItem>
            ))}
            </PopupButton>
            </Grid>
            <Grid item>
            <PopupButton 
            label={isBook(location.pathname) ? "Chọn nhà xuất bản" : "Chọn nhà sản xuất"}
            highlightcolor={filters["manufacturerID"] ? "red" : undefined}
            >
            {manufacturersList.map((manufacturer, index) => (
                <MenuItem 
                key={index} 
                onClick={() => handleFilterChange({target: {name: 'manufacturerID', value: manufacturer.ID}})}>
                    {manufacturer.name}                    
                </MenuItem>
            ))}   
            </PopupButton>   
            </Grid> 
            <Grid item>
            <PopupButton label="Giá" highlightcolor={filters["price"] ? "red" : undefined}>
              <Grid container sx={{width: '300px'}} justifyContent="center">
              <Grid item xs={6}>
              <div style={{margin: '5px'}}>{currentPrice[0]}d</div>
              </Grid>
              <Grid item xs={6}>
              <div style={{textAlign: 'right', margin: '5px'}}>{currentPrice[1]}d</div>
              </Grid>              
              <Grid item xs={12}>
              <Box sx={{width: '80%', margin: 'auto'}}>
              <StyledSlider
                value={currentPrice}
                onChange={(e, newVal) => setCurrentPrice(newVal)}
                step={10000}
                min={priceRange[0]}
                max={priceRange[1]}
              />
              </Box>
              </Grid>
              <Grid item>
              <SndLayerButton 
              onClick={() => handleFilterChange({target: {name: 'price', value: priceToQueryValue(currentPrice)}})}
              sx={{margin: '5px'}} 
              >
                Xem kết quả
              </SndLayerButton>
              </Grid>
              </Grid>
            </PopupButton>     
            </Grid> 
            </Grid>                  
        </Grid>        
        <Grid item xs={12}>
            <div style={filterTypeLabel}>Sắp xếp theo</div>
            <Grid container spacing={4}>
            <Grid item>
                <SndLayerButton 
                variant="contained"
                endIcon={<ArrowUpward />}
                onClick={() => {
                  handleFilterChange({target: {name: 'filter_price', value: 'asc'}})
                }}
                highlightcolor={filters.order === 'filter_price' && filters.dir === 'asc' ? "red" : undefined}
                > 
                    Giá tăng dần
                </SndLayerButton>
            </Grid>
            <Grid item>
                <SndLayerButton 
                variant="contained"
                endIcon={<ArrowDownward />}
                onClick={() => {
                  handleFilterChange({target: {name: 'filter_price', value: 'dsc'}})
                }}
                highlightcolor={filters.order === 'filter_price' && filters.dir === 'dsc' ? "red" : undefined}
                > 
                    Giá giảm dần
                </SndLayerButton>
            </Grid> 
            <Grid item>
                <SndLayerButton 
                variant="contained"
                onClick={() => {
                  handleFilterChange({target: {name: 'sold_quantity', value: 'dsc'}})
                }}
                highlightcolor={filters.order === 'sold_quantity' && filters.dir === 'dsc' ? "red" : undefined}
                > 
                    Bán chạy nhất
                </SndLayerButton>
            </Grid>             
            </Grid>                  
        </Grid>   
        {Object.keys(filters).length !==  0 && (
        <Grid item xs={12}>
            <div style={filterTypeLabel}>Đang lọc theo</div>
            <Grid container spacing={4}>
            {getLabelsCurrentFilter().map((item, index) => (
              <Grid item key={index}>
              <FilteringQuitButton 
              variant="contained"
              label={item.label} 
              onClick={() => {
                if (item.key === 'order') {
                  let newFilters = {...filters}
                  if (newFilters.hasOwnProperty('order')) {
                    delete newFilters['order']
                  }
                  if (newFilters.hasOwnProperty('dir')) {
                    delete newFilters['dir']
                  }                  
                  setFilters(newFilters)
                } else {
                  let newFilters = {...filters}
                  if (newFilters.hasOwnProperty(item.key)) {
                    delete newFilters[item.key]
                  }               
                  setFilters(newFilters)
                }
              }}
              />
              </Grid>   
            ))}  

              <Grid item>
              <FilteringQuitButton
              variant="contained"
              label="Xoá tất cả" 
              onClick={() => {
                setFilters({})
                navigate(location.pathname)
              }}
              />
              </Grid>     
            </Grid>                  
        </Grid>     
        )}                       
    </Grid>
    
    <Box>
      {products.map(product => (
        <div key={product.id}>{product.name}: {product.price}</div>
      ))}
    </Box>
    </>
  );
}
export default ProductFilterPage;

