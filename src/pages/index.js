import React from "react"
import styled from "tachyons-components"

import Layout from "../components/layout"
import SEO from "../components/seo"
import {Link} from '@reach/router'
import {base} from '../airtable'

const DetailsLink = styled(Link)`
  f6 link dim br2 ph3 pv2 mb2 dib white bg-pink sans-serif
`

const ProgressBarContainer = styled("div")`
  bg-moon-gray h1 overflow-y-hidden o-70 absolute w-100 bottom-0
`

const RelativeContainer = styled("div")`
  relative
`

const ProgressBar = styled("div")`
  bg-pink h1
  ${props => `${props.percentage}%`}
`

const FlexWrap = styled("div")`
  flex flex-wrap items-start
`

const Article = styled("article")`
  br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center ml2
`

const Image = styled("img")`
  db w-100 br2 br--top
`

const CardContent = styled("div")`
  pa2 ph3-ns pb3-ns
`

const Description = styled("p")`
  f6 lh-copy measure mt2 mid-gray
`

const IndexPage = () => {
  const [events, setEvents] = React.useState([])

  React.useEffect(() => {
    base("Events")
      .select({
        view: "Grid view",
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(function(record) {
            setEvents(loadedEvents => [...loadedEvents, {...record.fields, id: record.id}])
          })
          fetchNextPage()
        },
        function done(err) {
          if (err) {
            console.error(err)
            return
          }
        }
      )
  }, [])

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to HACKER TRAVEL.</p>
      <FlexWrap>
        {events.map(event => {
          console.log(event)
          return (
            <Article>
              <RelativeContainer>
                <Image src={event.Photo[0].url} alt={event.Name} />
                <ProgressBarContainer>
                  <ProgressBar style={{ width: `${event.Funding * 100}%` }} />
                </ProgressBarContainer>
              </RelativeContainer>
              <CardContent>
                <h2>{event.Name}</h2>
                <Description>{event.Description}</Description>
                <DetailsLink to={`/event?event=${event.id}`}>Details...</DetailsLink>
              </CardContent>
            </Article>
          )
        })}
      </FlexWrap>
    </Layout>
  )
}

export default IndexPage
