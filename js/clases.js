class Producto {
    constructor(carritoProductos){
    let carrito = carritoProductos

    this.calculoTotalCarrito = () =>{
        let total = 0
        for(let producto of carrito){
            total += parseFloat(producto.precio)

        }
        return total
     }

     this.calculoDescuentoAplicado = () =>{
         let totalConDescuento = 0
         let totalSinDescuento =  this.calculoTotalCarrito()
         const res = DESCUENTO.find(d => d.total == carrito.length)
            if(res == undefined){
                totalConDescuento = totalSinDescuento
            }else{
                totalConDescuento = (totalSinDescuento * parseFloat(res.factor))
            }
            return totalConDescuento
     }
 }
}

