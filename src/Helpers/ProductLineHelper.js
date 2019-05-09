class productLineHelper {
  static GetUpdatedLines(basketLinesModel, GlobalDeleveryDate) {
    let lines = [];
    if (GlobalDeleveryDate === undefined || GlobalDeleveryDate === "")
      lines = basketLinesModel.filter(item => item.IsChange === true);
    else lines = basketLinesModel;

    var changeModel = {};
    var Lines = [];

    //console.log(lines);
    lines.forEach(function(line) {
      var updatelineLine = {};
      var productType = productLineHelper.GetProductTypeValue(line.Product);
      updatelineLine["$type"] =
        "Sana.Commerce.Customization.ExtendedModels.ExtendedProductLine, Sana.Commerce.Sdk";
      updatelineLine["ProductType"] = null;
      updatelineLine["InforComment"] = line.SalesLine.InforComment;

      if (
        GlobalDeleveryDate === undefined ||
        GlobalDeleveryDate === "" ||
        GlobalDeleveryDate === null
      ) {
        updatelineLine["DeliveryDate"] = new Date(line.SalesLine.DeliveryDate);
      } else {
        updatelineLine["DeliveryDate"] = new Date(GlobalDeleveryDate);
      }
      updatelineLine["BasketLineId"] = line.SalesLine.Id;
      updatelineLine["ProductId"] = line.ProductId;
      updatelineLine["VariantId"] = null;
      updatelineLine["Quantity"] = line.QuantityModel.Current;
      updatelineLine["UnitOfMeasureId"] = line.SalesLine.UnitOfMeasureId;
      updatelineLine["IsPrepack"] = line.SalesLine.IsPrepack;
      updatelineLine["VerticalCode"] = line.SalesLine.VerticalCode;
      updatelineLine["ModifiedDate"] = line.SalesLine.ModifiedDate;

      Lines.push(updatelineLine);
    });
    changeModel.Lines = Lines;
    return changeModel;
  }

  static GetCrossRefereceNumbers(Product) {
    var crossreffnumbersvalues = "";
    if (Product) {
      var crossProducts = Product.CrossReferenceProducts;
      if (crossProducts && crossProducts.length > 0) {
        crossProducts.forEach(function(item, i) {
          if (i === 0) crossreffnumbersvalues = item.CrossReferenceNo.toString();
          else {
            crossreffnumbersvalues = crossreffnumbersvalues.concat(", ", item.CrossReferenceNo);
          }
        });
      }
    }
    return crossreffnumbersvalues;
  }

  static GetProductTypeValue(Product) {
    if (Product !== undefined) {
      if (Product.Standard) {
        //return 'Standard';
        return { Id: "00", Title: "Standard" };
      } else if (Product.New) {
        /* return 'New'; */
        return { Id: "01", Title: "New" };
      } else if (Product.RemanWith) {
        /* return 'RemanWith'; */
        return { Id: "02", Title: "RemanWith" };
      } else if (Product.RemanWithout) {
        /* return 'RemanWithout'; */
        return { Id: "02", Title: "RemanWithout" };
      } else return "";
    } else {
      return GetDymmyProductTypeValue();
    }
  }

  static GetDymmyProductTypeValue() {
    return { Id: "-1", Title: "Select" };
  }
  static GetAllProductTypeValues() {
    return [
      { Id: "00", Title: "Standard" },
      { Id: "01", Title: "New" },
      { Id: "02", Title: "RemanWith" },
      { Id: "02", Title: "RemanWithout" }
    ];
  }
}

export default productLineHelper;
