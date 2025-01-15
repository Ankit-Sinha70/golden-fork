import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CircularLoader from "../../../../../../components/CircularLoader/CircularLoader";
import FoodTable from "../../../../../../components/Table/FoodTable";
import { getCategoryById } from "../../../../../../redux/slices/menuCategorySlice";

const KitchenMenuCategoryView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoryById(id));
  }, [dispatch, id]);

  const { selectedCategory, loading } = useSelector(
    (state) => state.menuCategory
  );

  return (
    <>
      {loading ? (
        <div>
          <CircularLoader />
        </div>
      ) : (
        <div className="pageTemplate kitchenMenu">
          <div className="pageTemplate__head">
            <h1 className="headTitle"> Menu Categories</h1>
          </div>

          <p className="kitchenMenu__title">{selectedCategory?.categoryName}</p>

          <Grid rid container spacing={4}>
            <Grid item xs={12} md={9}>
              <div className="kitchenMenuTable">
                <FoodTable tableData={selectedCategory} />
              </div>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
};

export default KitchenMenuCategoryView;
