import { useTranslation } from 'react-i18next'

function PolicyPage() {
  const { t } = useTranslation('policy')
  return (
    <div className="contact-container mx-32 mb-16">
      <div className="flex flex-row justify-between">
        <div className="mr-4 mt-12">
          <div>
            <p className="mb-8 w-full text-7xl font-extrabold text-orange-600">{t('policy-term')}</p>
          </div>
          <div>
            <p className="mt-2 pt-4 text-2xl font-bold">{t('policy-1')}</p>

            <div className="ml-4">
              <p className="text-md py-4 font-bold">{t('policy-2')} </p>
              <p className="text-md">{t('policy-p1')}</p>
              <p className="text-md py-4 font-bold">{t('policy-3')}</p>
              <p className="text-md">{t('policy-p2')}</p>
            </div>

            <p className="mt-2 pt-4 text-2xl font-bold">{t('policy-4')}</p>
            <div className="ml-4">
              <p className="text-md py-4 font-bold">{t('policy-5')}</p>
              <p>{t('policy-p3')}</p>
              <p className="text-md py-4 font-bold">{t('policy-6')} </p>
              <p className="text-md">{t('policy-p4')}</p>
              <p className="text-md">{t('policy-p04')}</p>
            </div>

            <p className="mt-2 pt-4 text-2xl font-bold">{t('policy-7')}</p>
            <div className="ml-4">
              <p className="text-md py-4 font-bold">{t('policy-8')}</p>
              <p className="text-md">{t('policy-p5')}</p>
              <p className="text-md py-4 font-bold">{t('policy-9')}</p>
              <p className="text-md">{t('policy-p6')}</p>
            </div>
            <p className="mb-4 mt-2 pt-4 text-2xl font-bold">{t('policy-10')}</p>
            <div className="ml-4">
              <p className="text-md">{t('policy-p7')}</p>
              <p className="text-md">{t('policy-p8')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PolicyPage
