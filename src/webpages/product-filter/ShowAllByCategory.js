import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
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

const categoriesList = [
    {unique_name: "sach-trong-nuoc", title: "Sách trong nước"},
    {unique_name: "sach-ngoai-quoc", title: "Sách ngoại quốc"},
    {unique_name: "van-phong-pham", title: "Văn phòng phẩm"},
    {unique_name: "do-choi", title: "Đồ chơi"},
    {unique_name: "hang-luu-niem", title: "Hàng lưu niệm"}
]
const getTitle = pathname => {
    const slashIndex = pathname.indexOf('/');
    const unique_name = pathname.substr(slashIndex + 1)
    for (const category of categoriesList) {
        if (category.unique_name === unique_name) {
            return category.title
        }
    }
}
const isBook = pathname => {
  const bookCategories = ["sach-trong-nuoc", "sach-ngoai-quoc"]
  const slashIndex = pathname.indexOf('/');
  pathname = pathname.substr(slashIndex + 1)
  return bookCategories.includes(pathname)
}

function ProductFilterPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const title = getTitle(location.pathname)
  const authors = [
    {id: 1, name: 'Nguyen Nhat Anh'},
    {id: 2, name: 'Nguyen Anh Nhat'}, 
    {id: 3, name: 'Jimmy Carter'}, 
    {id: 4, name: 'Nguyen Van Nguyen Van'}
  ]
  const manufacturers = [
    {id: 1, name: 'NXB Giao duc', country: 'Vietnam'},
    {id: 2, name: 'NXB Dan tri', country: 'Vietnam'}, 
    {id: 3, name: 'NXB ABC', country: 'Trung Quoc'}, 
    {id: 4, name: 'NXB XYZ', country: 'Hoa Ky'}
  ]
  const priceRange = [0, 10000000]
  const [currentPrice, setCurrentPrice] = useState(priceRange)
  const priceToQueryValue = priceRange => {
    return priceRange[0] + '-' + priceRange[1]
  }

  // Parse the filter parameters from the URL query string
  const [filters, setFilters] = useState({})
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const filterObj = {};
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
//   useEffect(() => {
//     axios.get('/api/products', { params: filters })
//       .then(response => {
//         setProducts(response.data);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }, [filters]);

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
        const authorEntry = authors.filter(author => author.id === value)[0]
        if (authorEntry !== undefined) {
          res.push({key: key, label: "Tac gia: " + authorEntry.name})
        }
      } else if (key === 'manufacturerID') {
        const name = isBook(location.pathname) ? "Nha xuat ban" : "Nha san xuat"
        const manufacturerEntry = manufacturers.filter(man => man.id === value)[0]
        if (manufacturerEntry !== undefined) {
          res.push({key: key, label: name + ': ' + manufacturerEntry.name})
        }
      } else if (key === 'price') {
        res.push({key: key, label: "Gia: " + value})
      } else if (value === 'sold_quantity') {
        hasSoldQuantity = true
        res.push({key: 'order', label: "Ban chay nhat"})
      } else if (key === 'dir') {
        if (!hasSoldQuantity)
          res.push({key: 'order', label: value === 'asc' ? 'Gia tang dan' : 'Gia giam dan'})
      }
    })
    return res
  }  

  // Render the filter form and product data
  return (
    <>
    <Grid container>
      <Grid item xs={12}>
        <div className='pageTitle'>{title}</div>
      </Grid>    
    </Grid>       
    <Grid container>
        <Grid item xs={12}>
            <div style={filterTypeLabel}>The loai hien tai</div>
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
                      setFilters({})
                    }}
                    >
                        {category.title}                    
                    </MenuItem>
                ))}
            </CustomSelect>
        </Grid>
        <Grid item xs={12}>
            <div style={filterTypeLabel}>Chon theo tieu chi</div>
            <Grid container spacing={4}>
            <Grid item>
            <PopupButton label="Chon tac gia" highlightcolor={filters["authorID"] ? "red" : undefined}>
            {authors.map((author, index) => (
                <MenuItem 
                key={index} 
                onClick={() => handleFilterChange({target: {name: 'authorID', value: author.id}})}>
                    {author.name}                    
                </MenuItem>
            ))}
            </PopupButton>
            </Grid>
            <Grid item>
            <PopupButton 
            label={isBook(location.pathname) ? "Chon nha xuat ban" : "Chon nha san xuat"}
            highlightcolor={filters["manufacturerID"] ? "red" : undefined}
            >
            {manufacturers.map((manufacturer, index) => (
                <MenuItem 
                key={index} 
                onClick={() => handleFilterChange({target: {name: 'manufacturerID', value: manufacturer.id}})}>
                    {manufacturer.name}                    
                </MenuItem>
            ))}   
            </PopupButton>   
            </Grid> 
            <Grid item>
            <PopupButton label="Gia" highlightcolor={filters["price"] ? "red" : undefined}>
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
                Xem ket qua
              </SndLayerButton>
              </Grid>
              </Grid>
            </PopupButton>     
            </Grid> 
            </Grid>                  
        </Grid>        
        <Grid item xs={12}>
            <div style={filterTypeLabel}>Sap xep theo</div>
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
                    Gia tang dan
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
                    Gia giam dan
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
                    Ban chay nhat
                </SndLayerButton>
            </Grid>             
            </Grid>                  
        </Grid>   
        {Object.keys(filters).length !==  0 && (
        <Grid item xs={12}>
            <div style={filterTypeLabel}>Dang loc theo</div>
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
              label="Xoa tat ca" 
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

