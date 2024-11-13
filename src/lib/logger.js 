/** @format */

import morgan from 'morgan'
import chalk from 'chalk'

const customLogger = morgan(function (tokens, req, res) {
  const { method, url, status, responseTime } = tokens
  const contentLength = tokens.res(req, res, 'content-length') || '-'
  const ipAddress = req.ip
  const userAgent = req.headers['user-agent']

  const userAgentParts = userAgent.split(' ')
  const [browser, version] = userAgentParts[0].split('/')
  const [engine, engineVersion] = userAgentParts[2].split('/')
  const platform = userAgentParts[3]
  const os = userAgentParts.slice(4, 6).join(' ')
  const device = userAgentParts.slice(6).join(' ')

  const log = [
    chalk.blue(`Method: ${method(req, res)}`),
    chalk.green(`URL: ${decodeURI(url(req, res)).replace(/ /g, '-')}`),
    chalk.yellow(`Status: ${status(req, res)}`),
    chalk.cyan(`Content Length: ${contentLength}`),
    chalk.magenta(`Response Time: ${responseTime} ms`), // Menggunakan nilai langsung dari token response-time
    chalk.red(`IP Address: ${ipAddress}`),
    chalk.gray(`Browser: ${browser} ${version}`),
    chalk.gray(`Engine: ${engine} ${engineVersion}`),
    chalk.gray(`Platform: ${platform}`),
    chalk.gray(`OS: ${os}`),
    chalk.gray(`Device: ${device}`),
  ]

  const separator = chalk.gray(
    '╔══════════════════════════════════════════════════════════════════════════╗'
  )

  console.log(separator)
  console.log(log.map(line => chalk.gray(`║ ${line}`)).join('\n'))
  console.log(
    chalk.gray(
      '╚══════════════════════════════════════════════════════════════════════════╝'
    )
  )
})

export default customLogger
