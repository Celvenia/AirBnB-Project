const express = require('express')
const router = express.Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, Review, SpotImage, sequelize} = require('../../db/models');
// const sequelize = require('sequelize')


const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSpot = [
    check('address')
    .exists({ checkFalsy: true })
    .not()
    .withMessage('Street address is required'),

    check('city')
    .exists({ checkFalsy: true })
    .not()
    .withMessage('City is required'),

    check('state')
      .exists({ checkFalsy: true })
      .not()
      .withMessage('State is required'),

    check('country')
      .exists({ checkFalsy: true })
      .not()
      .withMessage('Country is required'),

    check('lat')
    .exists({ checkFalsy: true })
    .isDecimal()
    .not()
      .withMessage("Latitude is not valid"),

    check('lng')
    .exists({ checkFalsy: true})
    .isDecimal()
    .not()
      .withMessage("Longitude is not valid"),

    check('name')
      .exists({ checkFalsy: true })
      .isLength({ max: 50 })
      .withMessage("Name must be less than 50 characters"),

    check('description')
    .exists({checkFalsy: true})
    .withMessage("Description is required"),

    check('price')
    .exists({checkFalsy: true})
    .withMessage("Price per day is required"),
    handleValidationErrors
  ];


//   "Name must be less than 50 characters",
//   "Description is required",
//   "Price per day is required"


// get all spots
router.get('/', async (req, res) => {
    const spots = await Spot.findAll()
    res.json(spots)
})

// get information from spot by id
router.get('/:spotId', async (req, res) => {
    const spotToFind = req.params.spotId
    const spot = await Spot.findByPk(spotToFind, {

        attributes: {
            include: [[sequelize.fn("AVG", sequelize.col("Reviews.stars")),
        "avgStarRating"], [sequelize.fn("COUNT", sequelize.col("Reviews.id")),
    "numReviews"]]
    },

        include: [
        {
            model: User,
            as: 'Owner',
            attributes: ['id', 'firstName', 'lastName'],
            subQuery: false
        },
         {
            model: SpotImage,
            attributes: ['id', 'url', 'preview'],
         },
         {
            model: Review,
            attributes: [],
            subQuery: false
         }
        ],
        // group: [Spot.id]
    })

    if(!spot) {
        res.status(404).json({message: "Spot couldn't be found"})
    }

    res.json(spot)

})

// create a spot
router.post('/', validateSpot, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price} = req.body
    const newSpot = await Spot.create({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
    })
    res.status(201).json({message: "Successfully created", data: newSpot})
})

// delete a spot
// router.delete('/:spotId', async (req, res) => {

// })

module.exports = router;
