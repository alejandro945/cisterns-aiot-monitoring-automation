import { Payment } from '@/domain/model/Payment'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/presentation/components/ui/card'
import { PRICING } from '@/presentation/constants/pricing.constants'
import { BellIcon, EyeNoneIcon, PersonIcon } from '@radix-ui/react-icons'
import React from 'react'

export const PricingDetail: React.FC<{ payment: Payment }> = ({ payment }) => {

    /**
     * Function to get the plan based on the price id
     * @param priceId - The price id
     * @returns - The plan title
     */
    const getPlanBasedOnPriceId = (priceId: string) => {
        const price = PRICING.find((pricing) => pricing.priceId === priceId)
        return price?.title
    }

    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle>Mi ultimo pago</CardTitle>
                <CardDescription>
                    {`A continuación se muestra el detalle de tu último pago realizado. El cual fue realizado el día ${new Date(payment?.created as number * 1000 || '').toDateString()}`}
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-1">
                <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
                    <BellIcon className="mt-px h-5 w-5" />
                    <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Total</p>
                        <p className="text-sm text-muted-foreground">
                            {payment.currency.toLocaleUpperCase()} {payment.amount}
                        </p>
                    </div>
                </div>
                <div className="-mx-2 flex items-start space-x-4 rounded-md bg-accent p-2 text-accent-foreground transition-all">
                    <PersonIcon className="mt-px h-5 w-5" />
                    <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Ciudad y deireccion</p>
                        <p className="text-sm text-muted-foreground">
                            {payment.city} - {payment.address}
                        </p>
                    </div>
                </div>
                <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
                    <EyeNoneIcon className="mt-px h-5 w-5" />
                    <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Plan</p>
                        <p className="text-sm text-muted-foreground">
                            {getPlanBasedOnPriceId(payment.priceId as string)}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
