import { auth } from '@/application/auth'
import { getLastPayment } from '@/infrastructure/gateway/payment-gateway'
import { Title } from '@/presentation/components/common/title'
import { Plans } from '@/presentation/containers/landing/server/Plans'
import { PricingDetail } from '@/presentation/containers/landing/server/PricingDetail'
import React from 'react'

const PaymentPage = async () => {
  const session = await auth()
  const lastPayment = await getLastPayment(session?.user?.id || '')

  return (
    <div className='flex flex-col gap-8 mt-8 px-24'>
      <Title mainTitle='Planes' description='Selecciona el plan que más se ajuste a tus necesidades' />
      {lastPayment && <PricingDetail payment={lastPayment} />}
      <Plans subs={lastPayment?.priceId} />
    </div>
  )
}

export default PaymentPage