let Gemstone = require("../models/").Gemstone;

module.exports = (data) => {
    return {
        getGemstones(req, res) {
            Gemstone.find({}).exec((err, collection) => {
                if (err) {
                    return res.send({
                        error: err
                    });
                }
                return res.send({
                    result: collection
                        .map((gemstone) => {
                            return {
                                id: gemstone._id,
                                name: gemstone.name,
                                description: gemstone.description.substr(0, 37) + "...",
                                image: gemstone.image,
                                price: gemstone.price,
                                quantity: gemstone.quantity
                            };
                        })
                        .slice(0, 3)
                });
            });
        },
        postGemstone(req, res) {
            res.status(200).send(`
                    <form id="newGemstone" action="/api/gemstone" method="post" enctype="application/x-www-form-urlencoded">
                        <p>
                            <label for="name" class="uname" data-icon="u">Name</label>
                        </p>
                        <p>
                            <input type="text" name="name">
                        </p>
                        <p>
                            <label for="description" class="uname" data-icon="u">Description</label>
                        </p>
                        <p>
                            <textarea rows="4" cols="50" name="description"></textarea>
                        </p>
                        <p>
                            <label for="image" class="uname" data-icon="u">Image</label>
                        </p>
                        <p>
                            <input type="text" name="image">
                        </p>
                        <p>
                            <label for="price" class="uname" data-icon="u">Price</label>
                        </p>
                        <p>
                            <input type="text" name="price">
                        </p>
                        <label for="quantity" class="uname" data-icon="u">Quantity</label>
                        </p>
                        <p>
                            <input type="text" name="quantity">
                        </p>
                        <p>
                            <input type="submit" value="Create">
                        </p>
                    </form>
                `);
        },
        createGemstone(req, res) {
            let newGemData = req.body;
            console.log(newGemData);
            Gemstone.create(newGemData, (err, gemstone) => {
                if (err) {
                    console.log("Failed to create new gemstone: " + err);
                    return res.send({
                        result: {
                            success: false,
                            error: `Duplicate gemstone: ${newGemData.name}`
                        }
                    });
                }

                if (!newGemData.name) {
                    res.status(400);
                    return res.send({
                        success: false,
                        message: "Gemstone must have a name!"
                    });
                }
                return res.status(200).json({
                    result: {
                        success: true,
                        id: gemstone._id,
                        name: gemstone.name,
                        description: gemstone.description,
                        image: gemstone.image,
                        price: gemstone.price,
                        quantity: gemstone.quantity
                    }
                });
            });
        },

        // updateGemstone(req, res) {
        //         if (req.user._id === req.body._id || req.user.roles.indexOf("admin") > -1) {
        //             let updatedUserData = req.body;
        //             if (updatedUserData.password && updatedUserData.password.length > 0) {
        //                 updatedUserData.salt = encryption.generateSalt();
        //                 updatedUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
        //             }

        //             user.update({ _id: req.body._id }, updatedUserData, () => {
        //                 res.end();
        //             });
        //         } else {
        //             res.send({ reason: "You do not have permissions!" });
        //         }
        //     },
        getAllGemstones(req, res) {
            // if (!req.isAuthenticated() || !(req.user.roles.indexOf("admin") > -1)) {
            //     if (req.isAuthenticated()) {
            //         res.send({ reason: "You are not an admin!" });
            //     } else {
            //         return res.status(401).redirect("/api/unauthorized");
            //     }
            // }

            Gemstone.find({}).exec((err, collection) => {
                if (err) {
                    return res.send({
                        error: err
                    });
                }
                return res.send({
                    result: collection
                        .map((gemstone) => {
                            return {
                                id: gemstone._id,
                                name: gemstone.name,
                                description: gemstone.description.substr(0, 37) + "...",
                                image: gemstone.image,
                                price: gemstone.price,
                                quantity: gemstone.quantity
                            };
                        })
                });
            });
        }
    };
};