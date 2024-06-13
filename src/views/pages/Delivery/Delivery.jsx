import { AddressSuggestions } from "react-dadata";
import React, { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import CardWrapper from "../../../components/CardWrapper/CardWrapper";
import {
 FormControl,
 FormLabel,
 RadioGroup,
 FormControlLabel,
 Radio,
 Button,
 InputLabel,
 Select,
 MenuItem,
 TextField,
 Grid,
} from "@mui/material";
import "react-dadata/dist/react-dadata.css";
import axios from "axios";
import { deliveryReducer, INITIAL_STATE } from "./Delivery.state";
import "./Delivery.css";

export const Delivery = ({ railwayStation }) => {
 const navigate = useNavigate();
 const [state, dispatch] = useReducer(deliveryReducer, INITIAL_STATE);

 const { factories, isDisabled, deliveryType, inputAddress, factoryId, inputFullAdress } =
  state;
 useEffect(() => {
  const fetchData = async () => {
   try {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
     navigate("/login");
     return;
    }

    const { data } = await axios.get(
     "http://145.239.84.6/api/v1/logistics/factories/",
     {
      headers: {
       Authorization: `Bearer ${accessToken}`,
       "Content-Type": "application/json",
      },
     }
    );
    dispatch({ type: "setFactoriesData", payload: data });
   } catch (error) {
    console.error("Error fetching data:", error);
    if (error.response && error.response.status === 401) {
     navigate("/login");
    }
   }
  };
  fetchData();
 }, [navigate]);

 const handleDeliveryChange = (event) => {
  dispatch({ type: "setDeliveryType", payload: event.target.value });
 };

 const handleFactoryChange = (value) => {
  dispatch({ type: "setFactoryId", payload: value });
  dispatch({ type: "setIsDisabled", payload: false });
 };

 const handleSelect = (suggestion) => {
  dispatch({ type: "setInputAddress", payload: suggestion});
 };


 console.log(inputFullAdress);

 return (
  <CardWrapper
   borderRadius="medium"
   width="medium"
   padding="32px 28px"
   justify="start"
  >
   <FormControl component="fieldset" fullWidth>
    <FormLabel component="legend">Выбери способ доставки</FormLabel>
    <RadioGroup
     aria-label="delivery"
     name="delivery"
     value={deliveryType}
     onChange={handleDeliveryChange}
     sx={{marginBottom: '12px'}}
    >
     <FormControlLabel value="self" control={<Radio />} label="Самовывоз" />
     <FormControlLabel value="auto" control={<Radio />} label="Авто" />
     <FormControlLabel value="train" control={<Radio />} label="ЖД" />
    </RadioGroup>

    {deliveryType === "self" && (
     <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      gap={"12px"}
      sx={{marginBottom: '16px'}}
     >
      <FormControl variant="outlined" sx={{ width: "266px",
       marginBottom: '4px',
       marginTop: '8px'
       }}>
       <InputLabel id="factories">Фабрика</InputLabel>
       <Select
        labelId="factories"
        margin="dense"
        name="factories"
        label="Фабрика"
        value={factoryId || ""}
        onChange={(e) => handleFactoryChange(e.target.value)}

       >
        {factories.map((item, i) => (
         <MenuItem value={item.id} key={i}>
          {item.full_name}
         </MenuItem>
        ))}
       </Select>
      </FormControl>
     </Grid>
    )}
    {deliveryType === "auto" && (
     <Grid
      container
      justifyContent="space-between"
      gap={"12px"}
      sx={{marginBottom: '16px'}}
     >
      <Grid item width={"266px"}
        sx={{marginTop: '8px'}}
      >
       <FormControl variant="outlined" fullWidth>
        <InputLabel id="factories">Фабрика</InputLabel>
        <Select
         labelId="factories"
         margin="dense"
         label="Фабрика"
         name="factories"
         value={factoryId || ""}
         onChange={(e) => handleFactoryChange(e.target.value)}
        >
         {factories.map((item, i) => (
          <MenuItem value={item.id} key={i}>
           {item.full_name}
          </MenuItem>
         ))}
        </Select>
       </FormControl>
      </Grid>

      <Grid item width={"266px"}>
         <FormControl variant="outlined" fullWidth>
          <AddressSuggestions
           token="0a6543eb60ae2f3ac3bfe23b841899781f5a5952"
           value={inputAddress || ''}
           onChange={handleSelect}

      filterFromBound="city"
      filterToBound="settlement"
           customInput={React.forwardRef((props, ref) => (
            <TextField
             {...props}
             inputRef={ref}
             fullWidth
             margin="dense"
             label="Город и область получения"
            />
           ))}
          />
       </FormControl>
      </Grid>
      <Grid item width={"266px"}>
       <TextField
        fullWidth
        margin="dense"
        type="number"
        label="Стоимость доставки"
       />
      </Grid>
     </Grid>
    )}
    {deliveryType === "train" && (
     <Grid
      container
      justifyContent="space-between"
      gap={"12px"}
      sx={{marginBottom: '16px'}}
     >
      
      <Grid item width={"266px"}
        sx={{marginTop: '8px'}}
      >
       <FormControl variant="outlined" fullWidth>
        <InputLabel id="factories">Фабрика</InputLabel>
        <Select
         labelId="factories"
         margin="dense"
         label="Фабрика"
         name="factories"
         value={factoryId || ""}
         onChange={(e) => handleFactoryChange(e.target.value)}
        >
         {factories.map((item, i) => (
          <MenuItem value={item.id} key={i}>
           {item.full_name}
          </MenuItem>
         ))}
        </Select>
       </FormControl>
      </Grid>

      <Grid
       item
       width={"266px"}
      >
       <FormControl variant="outlined" fullWidth>
        <TextField
         value={railwayStation}
         fullWidth
         margin="dense"
         label="Станция получения"
         InputProps={{
          readOnly: true,
         }}
        />
       </FormControl>
      </Grid>
      <Grid item width={"266px"}>
       <TextField
        fullWidth
        margin="dense"
        type="number"
        label="Стоимость доставки"
       />
      </Grid>
     </Grid>
    )}
    <Button
     disabled={isDisabled}
     variant="contained"
     onClick={(e) => {
      console.log("click");
      console.log(e);
     }}
     color="primary"
     sx={{display: 'inline-block'}}
    >
     {"Продолжить"}
    </Button>
   </FormControl>
  </CardWrapper>
 );
};
