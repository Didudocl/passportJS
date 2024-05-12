import {db} from '../index.js';
import { usuarioDoc } from "../config/passport-setup.js";

export async function createMeeting(req, res) {
	try {
		const {
			name_meeting,
			date_meeting,
			time_meeting,
			location_meeting,
			type_meeting,
			participants_meeting,
		} = req.body;
		const docRef = await db.collection("meetings").add({
			createdBy: usuarioDoc.email,
			name_meeting,
			date_meeting,
			time_meeting,
			location_meeting,
			type_meeting,
			participants_meeting,
		});
        
        // Obtener el ID del documento recién creado
        const docId = docRef.id;

        // Obtener el documento completo de Firestore usando el ID
        const docSnapshot = await db.collection("meetings").doc(docId).get();
        const meetingData = docSnapshot.data();

		return res.status(201).json({
             message: "Reunión creada!",
             data: meetingData
        });
	} catch (error) {
		console.error("Error creating meeting:", error);
		return res.status(500).json({ message: "Error creating meeting" });
	}
}

export async function getMeetings(req, res) {
	try {
		const query = db.collection("meetings");
		const querySnapshot = await query.get();
		const docs = querySnapshot.docs;
		const response = docs.map((doc) => {
			const {
				id_user,
				name_meeting,
				date_meeting,
				time_meeting,
				location_meeting,
				type_meeting,
				participants_meeting,
			} = doc.data();
			return {
				id_meeting: doc.id,
				id_user,
				name_meeting,
				date_meeting,
				time_meeting,
				location_meeting,
				type_meeting,
				participants_meeting,
			};
		});
		return res.status(200).json(response);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Error getting meetings" });
	}
}

export async function getMeeting(req, res) {
	try {
		const { id } = req.params;
		const meetingRef = db.collection("meetings").doc(id);
		const doc = await meetingRef.get();
		if (!doc.exists) {
			return res.status(404).json({ message: "Meeting not found" });
		} else {
			const {
				id_user,
				name_meeting,
				date_meeting,
				time_meeting,
				location_meeting,
				type_meeting,
				participants_meeting,
			} = doc.data();
			return res.status(200).json({
				id_meeting: doc.id,
				id_user,
				name_meeting,
				date_meeting,
				time_meeting,
				location_meeting,
				type_meeting,
				participants_meeting,
			});
		}
	} catch (error) {
		console.error("Error getting meeting:", error);
		return res.status(500).json({ message: "Error getting meeting" });
	}
}

export async function updateMeeting(req, res) {
	try {
		const { id } = req.params;
		const {
			name_meeting,
			date_meeting,
			time_meeting,
			location_meeting,
			type_meeting,
			participants_meeting,
		} = req.body;
		const meetingRef = db.collection("meetings").doc(id);
		await meetingRef.update({
			name_meeting,
			date_meeting,
			time_meeting,
			location_meeting,
			type_meeting,
			participants_meeting,
		});
		return res.status(200).json({ message: "Meeting updated" });
	} catch (error) {
		console.error("Error updating meeting:", error);
		return res.status(500).json({ message: "Error updating meeting" });
	}
}

export async function deleteMeeting(req, res) {
	try {
		const { id } = req.params;
		const meetingRef = db.collection("meetings").doc(id);
		await meetingRef.delete();
		return res.status(200).json({ message: "Meeting deleted" });
	} catch (error) {
		console.error("Error deleting meeting:", error);
		return res.status(500).json({ message: "Error deleting meeting" });
	}
}