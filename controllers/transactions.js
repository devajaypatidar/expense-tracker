const { count } = require('../models/Transaction');
const Transaction = require('../models/Transaction');


// get all transactions 
// route = get  /api/v1/transaction
exports.getTransactions = async(req,res,next) => {
    try{
        const transaction = await Transaction.find();
        return res.status(200).json({
            sucess: true,
            count: transaction.length,
            data: transaction
        })
    }catch(err){
        
        return res.status(500).json({
            sucess: false,
            error : "server Error",
        })
    }
}

// add Transaction 
// @route POST /api/v1/transactions

exports.addTransaction = async(req,res,next) =>{
    try {
        const { text, amount } = req.body;
    
        const transaction = await Transaction.create(req.body);
      
        return res.status(201).json({
          success: true,
          data: transaction
        }); 
      } catch (err) {
        
        if(err.name === 'ValidationError') {
          const messages = Object.values(err.errors).map(val => val.message);
    
          return res.status(400).json({
            success: false,
            error: messages
          });
        } else {
          return res.status(500).json({
            success: false,
            error: 'Server Error'
          });
        }
      }
}

// delete transactions
// @route DELETE /api/v1/transaction/:id

exports.deleteTransaction = async(req,res,next) => {
    try{
        const transaction = await Transaction.findById(req.params.id);
        if(!transaction){
            return res.status(404).json({
                success: false,
                error: "NO Transaction found"
            })
        }

        await transaction.remove();

        return res.status(200).json({
        success: true,
        data: {}})

    }catch(err){
        return res.status(500).json({
            success: false,
            error: 'Server Error'
          });
    }
}