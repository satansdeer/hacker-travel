import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { base } from "../airtable"
import style from 'tachyons-components'

const HeroImage = style('img')`
  w-100
`

const SecondPage = () => {
  const [event, setEvent] = React.useState()

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const eventId = params.get("event")
    console.log(eventId)
    base("Events").find(eventId, function(err, record) {
      if (err) {
        console.error(err)
        return
      }
      setEvent(record.fields)
    })
  }, [])

  if (!event) {
    return null
  }

  return (
    <Layout>
      <SEO title="Page two" />
      <HeroImage src={event.Photo[0].url}/>
      <h1>{event.Name}</h1>
      <p>{event.Location}</p>
      <hr/>
      <p>{event.Description}</p>
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

export default SecondPage
