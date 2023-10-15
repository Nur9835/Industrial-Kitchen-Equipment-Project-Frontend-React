const express= require('express');
const connection=require('../connection');
const router= express.Router();
let ejs=require('ejs');
let pdf=require('html-pdf');
let path= require('path');
var fs= require('fs');
var uuid=require('uuid')
var auth= require('../services/authentication');
const { report } = require('..');


router.post('/generateReport', auth.authenticateToken, (req, res) => {
    const generatedUuid = uuid.v1(); 
    const orderDetails = req.body;
    const productDetailsReport = JSON.parse(orderDetails.productDetails);
  
    const query = "INSERT INTO bill (name, uuid, email, contactNumber, paymentMethod, total, productDetails, createdBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  
    connection.query(query, [orderDetails.name, generatedUuid, orderDetails.email, orderDetails.contactNumber, orderDetails.paymentMethod, orderDetails.totalAmount, orderDetails.productDetails, res.locals.email], (err, results) => {
      if (!err) {
        ejs.renderFile(path.join(__dirname, '', "report.ejs"), {
          productDetails: productDetailsReport,
          name: orderDetails.name,
          email: orderDetails.email,
          contactNumber: orderDetails.contactNumber,
          paymentMethod: orderDetails.paymentMethod,
          totalAmount: orderDetails.totalAmount
        }, (err, html) => {
          if (err) {
            return res.status(500).json(err);
          } else {
            pdf.create(html).toFile(`./generated_pdf/${generatedUuid}.pdf`, (err, data) => {
              if (err) {
                console.log(err);
                return res.status(500).json(err);
              } else {
                return res.status(200).json({ uuid: generatedUuid });
              }
            });
          }
        });
      } else {
        return res.status(500).json(err);
      }
    });
  });


  router.post('/savePdf', async (req, res) => {
    try {
      const { pdfData, filePath } = req.body;
      const pdfDataString = pdfData.toString();

      
      if (!fs.existsSync(path.dirname(filePath))) {
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
      }
      fs.writeFileSync(filePath, pdfDataString);
      res.status(200).json({ message: 'PDF başarıyla sunucuda kaydedildi' });
    } catch (error) {
      console.error('PDF kaydetme hatası:', error);
      res.status(500).json({ message: 'Sunucuda PDF kaydedilemedi', error: error.message });
    }
  });



router.post('/getPdf', auth.authenticateToken, (req, res) => {
  const orderDetails = req.body;
  const pdfPath = './generated_pdf/' + orderDetails.uuid + '.pdf';

  if (fs.existsSync(pdfPath)) {
    res.contentType("application/pdf");
    fs.createReadStream(pdfPath).pipe(res);
  } else {


   var productDetailsReport = JSON.parse(orderDetails.productDetails);
   console.log('Product Details:', productDetailsReport);
  // var productDetailsReport = orderDetails.productDetails;

    ejs.renderFile(path.join(__dirname, '', "report.ejs"), {

      productDetails: productDetailsReport,
      name: orderDetails.name,
      email: orderDetails.email,
      contactNumber: orderDetails.contactNumber,
      paymentMethod: orderDetails.paymentMethod,
      totalAmount: orderDetails.totalAmount
    }, (err, results) => {
      if (err) {
        console.error("EJS Hatası:", err);
        return res.status(500).json({ error: "Rapor oluşturma hatası" });
      } else {
        pdf.create(results).toFile(pdfPath, function (err, data) {
          if (err) {
            console.error("PDF Oluşturma Hatası:", err);
            return res.status(500).json({ error: "PDF oluşturma hatası" });
          } else {
            res.contentType("application/pdf");
            fs.createReadStream(pdfPath).pipe(res);
          }
        });
      }
    });
  }
});


router.get('/getBills',auth.authenticateToken,(req,res,next)=>{
    var query= "select *from bill order by id DESC";
    connection.query(query,(err,results)=>{
        if(!err){
            return res.status(200).json(results); 
    }
    else{
        return res.status(500).json(err);
    }
    })
})


router.delete('/delete/:id',auth.authenticateToken,(req,res,next)=>{
    const id= req.params.id;
    var query= "delete from bill where id=?";
   connection.query(query,[id],(err,results)=>{
    if(!err){
        if(results.affectedRows ==0){
            return res.status(404).json({message:"Bill id does not found "});
        }
    return res.status(200).json({message:"Bill deleted successfully"});

    }
    else{
        return res.status(500).json(err);
    }

   })
})

module.exports=router;


