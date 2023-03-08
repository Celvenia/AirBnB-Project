"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          url: `https://res.cloudinary.com/dtzv3fsas/image/upload/v1677693183/191a4a25-0c1d-4405-93dc-21c043c3ccb1_sasl7h.jpg`,
          preview: true,
        },
        {
          spotId: 1,
          url: `https://res.cloudinary.com/dtzv3fsas/image/upload/v1677693020/18c7040b-9be5-443e-8252-de26dce63c44_wmxvou.jpg`,
          preview: true,
        },
        {
          spotId: 1,
          url: `https://res.cloudinary.com/dtzv3fsas/image/upload/v1677693073/24b9c9d2-bc8d-4e37-93bc-7b97977ceef4_xp35yk.jpg`,
          preview: true,
        },
        {
          spotId: 1,
          url: `https://res.cloudinary.com/dtzv3fsas/image/upload/v1677693102/38246975-bf2a-43fb-896e-501984881d33_gskyd0.jpg`,
          preview: true,
        },
        {
          spotId: 1,
          url: `https://res.cloudinary.com/dtzv3fsas/image/upload/v1677693151/141e49a0-2ad8-4cc5-9eff-f9ce62476648_j8xkvc.jpg`,
          preview: true,
        },

        {
          spotId: 2,
          url: `https://res.cloudinary.com/dtzv3fsas/image/upload/v1677693229/601996fa-4df1-4978-a7fd-c56c4078a3b0_yfnlsm.jpg`,
          preview: true,
        },
        {
          spotId: 2,
          url: `https://res.cloudinary.com/dtzv3fsas/image/upload/v1677693278/0dedda9a-7094-44c0-971c-977870d432d6_d5kh9q.jpg`,
          preview: true,
        },
        {
          spotId: 2,
          url: `https://res.cloudinary.com/dtzv3fsas/image/upload/v1677693290/7069c910-2ed3-4158-a571-6a38ee354f1c_qf0xrk.jpg`,
          preview: true,
        },
        {
          spotId: 2,
          url: `https://res.cloudinary.com/dtzv3fsas/image/upload/v1677693301/2ea7ab4c-3cb5-4efa-9335-1b984af04220_scjdyy.jpg`,
          preview: true,
        },
        {
          spotId: 2,
          url: `https://res.cloudinary.com/dtzv3fsas/image/upload/v1677693312/7e568700-6cec-493b-ae36-c180db40fb61_c3nuai.jpg`,
          preview: true,
        },

        {
          spotId: 3,
          url: `https://res.cloudinary.com/dtzv3fsas/image/upload/v1677693375/a45d532e-4244-4b88-bf06-0bae0cdff908_ulx4rl.jpg`,
          preview: true,
        },
        {
          spotId: 3,
          url: `https://res.cloudinary.com/dtzv3fsas/image/upload/v1677693388/23cc7524-c74c-4beb-b38e-b9be24ba6249_ilv5in.jpg`,
          preview: true,
        },
        {
          spotId: 3,
          url: `https://res.cloudinary.com/dtzv3fsas/image/upload/v1677693403/dd5c7da4-7fe0-48cc-a7f4-8986a154c1d3_uv9dnt.jpg`,
          preview: true,
        },
        {
          spotId: 3,
          url: `https://res.cloudinary.com/dtzv3fsas/image/upload/v1677693415/a918c74a-9b80-4e1a-8272-3616785795af_j5hrk4.jpg`,
          preview: true,
        },
        {
          spotId: 3,
          url: `https://res.cloudinary.com/dtzv3fsas/image/upload/v1677693425/53647c45-5539-4d37-aeb7-525d73113d12_nnvs11.jpg`,
          preview: true,
        },

        {
          spotId: 4,
          url: `https://res.cloudinary.com/dtzv3fsas/image/upload/v1677693493/0ce8eafd-51a0-456a-b35c-cbe3a723be31_s7g3ba.jpg`,
          preview: true,
        },
        {
          spotId: 4,
          url: `https://res.cloudinary.com/dtzv3fsas/image/upload/v1677693504/c0fa5c8b-beb9-45ba-a20e-6c1b3f40c33f_rmjrvq.jpg`,
          preview: true,
        },
        {
          spotId: 4,
          url: `https://res.cloudinary.com/dtzv3fsas/image/upload/v1677693513/9e847b21-bb28-4eeb-a4ae-dfc1ff4c2147_iyhlo3.jpg`,
          preview: true,
        },
        {
          spotId: 4,
          url: `https://res.cloudinary.com/dtzv3fsas/image/upload/v1677693524/81d3f240-67c7-439e-ad74-865730d24ef8_e11npz.jpg`,
          preview: true,
        },
        {
          spotId: 4,
          url: `https://res.cloudinary.com/dtzv3fsas/image/upload/v1677693425/53647c45-5539-4d37-aeb7-525d73113d12_nnvs11.jpg`,
          preview: true,
        },

        {
          spotId: 5,
          url: `https://res.cloudinary.com/dtzv3fsas/image/upload/v1677693621/e9bb7061-0914-4919-8788-346643fdd448_xkwoox.jpg`,
          preview: true,
        },
        {
          spotId: 5,
          url: `https://res.cloudinary.com/dtzv3fsas/image/upload/v1677693679/49a7cbc0-bb86-4e1e-8454-a2c092d28321_wnrflo.jpg`,
          preview: true,
        },
        {
          spotId: 5,
          url: `https://res.cloudinary.com/dtzv3fsas/image/upload/v1677693639/336afe3b-3868-482e-8596-95358c8c6a3c_wvedhs.jpg`,
          preview: true,
        },
        {
          spotId: 5,
          url: `https://res.cloudinary.com/dtzv3fsas/image/upload/v1677693651/ba7d036a-9094-4e97-88d2-da76740c68a3_is8gm7.jpg`,
          preview: true,
        },
        {
          spotId: 5,
          url: `https://res.cloudinary.com/dtzv3fsas/image/upload/v1677693663/d3a3eb9a-ea98-40cc-8642-95c81d9303f5_n54n5t.jpg`,
          preview: true,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {});
  },
};
