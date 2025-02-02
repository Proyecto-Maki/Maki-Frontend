import React, { createContext, useEffect, useState } from 'react';

export const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedSubsubcategory, setSelectedSubsubcategory] = useState(null);

  const handleCategoryChange = (category) => {
    // console.log("Category: ", category);
    setSelectedCategory(category);
  };

  const handleSubcategoryChange = (subcategory) => {
    // console.log("Subcategory: ", subcategory);
    setSelectedSubcategory(subcategory);
  };

  const handleSubsubcategoryChange = (subsubcategory) => {
    // console.log("Subsubcategory: ", subsubcategory);
    setSelectedSubsubcategory(subsubcategory);
  };

  const getSelectedCategories = () => {
    return { selectedCategory, selectedSubcategory, selectedSubsubcategory };
  };

  useEffect(() => {
    console.log("Cambios desde CategoriesContext", getSelectedCategories());
  })



  return (
    <CategoriesContext.Provider value={{
      selectedCategory,
      setSelectedCategory,
      selectedSubcategory,
      setSelectedSubcategory,
      selectedSubsubcategory,
      setSelectedSubsubcategory,
      handleCategoryChange,
      handleSubcategoryChange,
      handleSubsubcategoryChange,
      getSelectedCategories
    }}>
      {children}
    </CategoriesContext.Provider>
  );
};