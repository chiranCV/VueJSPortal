class ProductLineHelper {
  // get updated basket lines.
  static GetUpdatedLines = (linesModel, globalDeleveryDate) => {
    let lines = [];
    if (globalDeleveryDate === undefined || globalDeleveryDate === "") {
      lines = linesModel.filter(item =>
        item.IsChange === true);
    } else lines = linesModel;

    const cahgneModel = {};
    const changelines = [];

    lines.array.forEach((line) => {
      const upddataedline = {};
      // const productType = ProductLineHelper.GetProductTypeValue(line.Product);
      upddataedline.$type = "Sana.Commerce.Customization.ExtendedModels.ExtendedProductLine, Sana.Commerce.Sdk";
      upddataedline.ProductType = null;
      upddataedline.InforComment = line.SalesLine.InforComment;
      if (
        globalDeleveryDate === undefined
        || globalDeleveryDate === ""
        || globalDeleveryDate === null
      ) {
        upddataedline.DeliveryDate = new Date(line.SalesLine.DeliveryDate);
      } else {
        upddataedline.DeliveryDate = new Date(globalDeleveryDate);
      }
      upddataedline.BasketLineId = line.SalesLine.Id;
      upddataedline.ProductId = line.ProductId;
      upddataedline.VariantId = null;
      upddataedline.Quantity = line.QuantityModel.Current;
      upddataedline.UnitOfMeasureId = line.SalesLine.UnitOfMeasureId;
      upddataedline.IsPrepack = line.SalesLine.IsPrepack;
      upddataedline.VerticalCode = line.SalesLine.VerticalCode;
      upddataedline.ModifiedDate = line.SalesLine.ModifiedDate;
      changelines.push(upddataedline);
    });
    cahgneModel.Lines = changelines;
    return cahgneModel;
  };

  // get product type values.
  static GetProductTypeValue = (product) => {
    if (product && product.Standard) {
      return { Id: "00", Title: "Standard" };
    }
    if (product.New) {
      return { Id: "01", Title: "New" };
    }
    if (product.RemanWith) {
      return { Id: "02", Title: "RemanWith" };
    }
    if (product.RemanWithout) {
      return { Id: "02", Title: "RemanWithout" };
    }
    return this.GetDymmyProductTypeValue();
  };

  static GetProductTypeValueById = (typeid) => {
    if (typeid === "00") {
      return { Id: "00", Title: "Standard" };
    }
    if (typeid === "01") {
      return { Id: "01", Title: "New" };
    }
    if (typeid === "02") {
      return { Id: "02", Title: "RemanWith" };
    }
    if (typeid === "03") {
      return { Id: "02", Title: "RemanWithout" };
    }
    return this.GetDymmyProductTypeValue();
  };

  // get dumy productType.
  static GetDymmyProductTypeValue = () =>
    ({ Id: "-1", Title: "Select" });

  // get product type values
  static GetAllProductTypeValues = () =>
    [
      { Id: "00", Title: "Standard" },
      { Id: "01", Title: "New" },
      { Id: "02", Title: "RemanWith" },
      { Id: "03", Title: "RemanWithout" }
    ];
}

export default ProductLineHelper;
