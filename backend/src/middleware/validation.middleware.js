const validateRequiredFields = (fields) => {
    return (req, res, next) => {

        const errors = [];

        fields.forEach(field => {

            if (
                req.body[field] === undefined ||
                req.body[field] === null ||
                req.body[field] === ""
            ) {
                errors.push({
                    field,
                    message: `${field} is required`
                });
            }

        });

        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                errors
            });
        }

        next();
    };
};

export default validateRequiredFields;