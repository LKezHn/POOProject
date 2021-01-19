package Classes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * Maneja la sesión.
 * @author POO
 * @version 1.0.1
 */
public class Auth {

	/**
	 * Constructor de la clase
	 */
	public Auth() {}
	
	/**
	 * Valida la sesión
	 * @param request Objeto request
	 * @param session La sesión
	 * @return boolean
	 * @since 1.0.1
	 */
	public boolean sessionIsValid(HttpServletRequest request, HttpSession session) {
		
		if(session.getAttribute("id") != null){
			if(request.getCookies()[0].getValue().toString().equals(session.getAttribute("id"))) {
				return true;
			}
		}else{
			this.createSession(request, session);
			return true;
		}
		return false;
	}
	
	/**
	 * Crea la sesión
	 * @param request Objeto request
	 * @param session La sesión
	 * @since 1.0.1
	 */
	public void createSession(HttpServletRequest request, HttpSession session) {
		if(request.getCookies()[0].getValue().toString() != null) {
			session.setAttribute("id", request.getCookies()[0].getValue().toString());
		}
	}
}
