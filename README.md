# CarDealer Demo KO

Demo application built with Knockout.js, Rails and Mongo DB. Layout is done using twitter bootstrap.

## Description

Single page application which is designed for a car sales company to manage vendible and sold cars.

Cars are modeled in single MongoDB document:

    {car: {model: "Honda", yearModel: 2009, licenceNumber: "XYZ-123"},
     price: 9000,
     saleContract: {customer: "Cindy Customer", price: 8900}}

Sale contract is optional - if there is sale contract then car is considered sold.

All DOM manipulations in UI are done implicitly by Knockout.js by computing from the model. I.e. when saleContract is set on the model, the car moves from the "Vendible cars" tab to "Sold cars" tab.


## Usage

Install rails and mongo DB.

Clone the repo and run:

    rails server

Go to localhost:3000. Add some cars and sell them.

