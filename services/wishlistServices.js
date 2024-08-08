const {Wishlist} = require('../models/wishlist')


const addItemInWishlist = async (req) => {
    const {productId } = req.params.product
    const {variantId} = req.params.productVarient

    userId = req.user.id

    if (!productId) {
        return {
            status: 'fail',
            message: 'Product not found',
        }
    }

    const wishlistItem = await Wishlist.findOne({
        where: {
            userId,
            productId,
            variantId
        },
    });

    if (wishlistItem) {
        return {
            status: 'fail',
            message: 'Item already exists in wishlist',
        }
    }

    await Wishlist.create({
        userId,
        productId,
        variantId
    });

    return {
        status:'success',
        message: 'Item added to wishlist',
    }
}

const removeItemFromWishlist = async (req) => {
    const {productId } = req.params.product
    const {variantId} = req.params.productVarient

    userId = req.user.id

    if (!productId) {
        return {
            status: 'fail',
            message: 'Product not found',
        }
    }

    const wishlistItem = await Wishlist.findOne({
        where: {
            userId,
            productId,
            variantId
        },
    });

    if (!wishlistItem) {
        return {
            status: 'fail',
            message: 'Item not found in wishlist',
        }
    }

    await wishlistItem.destroy();

    return {
        status:'success',
        message: 'Item removed from wishlist',
    }
}

const getWishlistItems = async (req) => {
    userId = req.user.id

    const wishlistItems = await Wishlist.findAll({
        where: {
            userId
        },
        include: [
            {model: Product, include: [{model: ProductVariant}]},
        ],
    });

    return {
        status:'success',
        data: wishlistItems,
    }
}



module.exports = {
    addItemInWishlist,
    removeItemFromWishlist,
    getWishlistItems
}