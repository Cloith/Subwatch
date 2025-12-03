import mongoose from "mongoose";
import dayjs from "dayjs";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subscription name is required'],
        trim: true,
        minlength: 2,
        maxlength: 100
    },
    price: {
        type: Number,
        required: [true, 'Subscription price is required'],
        min: [0, 'Subscription price must be greater than 0'],
        max: [1000, 'Subscription price must be less than 1000']
    },
    currency: {
        type: String,
        enum: ['USD','PHP'],
        default: 'USD',
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
    },
    category: {
        type: String,
        enum: ['sports', 'news', 'entertainment', 'lifestyle', 'technology', 'finance', 'politics', 'others'],
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['active', 'canceled', 'expired'],
        default: 'active'
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => value <= new Date(),
            message: 'Start date must be in the past',
        }
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function (value) {
                return value > this.startDate;
            },
            message: 'Renewal must be after the start date',
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        indexes: true
    }

}, { timestamps: true });
//Auto calculate the renewal date if missing
subscriptionSchema.pre('save', async function() {
    if (!this.renewalDate) {
        const start = dayjs(this.startDate);

        const renewalDate = {
            daily: start.add(1, "day"),
            weekly: start.add(1, "week"),
            monthly: start.add(1, "month"),
            yearly: start.add(1, "year"),
        }[this.frequency];

        this.renewalDate = renewalDate.toDate();
    }

    if (this.renewalDate < new Date()) {
        this.status = 'expired';
    }

    //next();
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;